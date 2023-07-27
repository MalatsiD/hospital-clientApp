import { DataService } from './../../../shared/services/data.service';
import { StatusChange } from './../../../shared/interfaces/status-change';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProvinceService } from 'src/app/services/province.service';
import { FilterParamList } from 'src/app/shared/interfaces/filter-params';
import { ProvinceView, ProvinceViewList } from 'src/app/shared/interfaces/provinceView';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrls: ['./provinces.component.scss']
})
export class ProvincesComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  tableIsLoading: boolean = false;
  provincesList: ProvinceViewList = [];

  paginationValues: number[] = [];
  filterParams: FilterParamList = [];

  confirmDialogHeader: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  inputSearch: string = '';
  inputChangeHasLoaded: boolean = true;

  provinceListSubscription = new Subscription();

  fakeData: any[] = [];
  fakeColumns: string[] = [];

  constructor(
    private provinceService: ProvinceService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.loadSkeleton();
    this.loadProvinces();
    this.detectProvinceDataChanges();
    this.paginationValues = this.sharedService.getTablePaginatorValues();
  }

  loadSkeleton(): void {
    this.fakeData = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    this.fakeColumns = ['Name', 'Code', 'Description', 'Country', 'Status', ''];
  }

  refreshData(): void {
    this.isLoading = true;
    this.loadProvinces();
  }

  detectProvinceDataChanges(): void {
    this.provinceListSubscription = this.dataService.getProvinceSingleData().subscribe({
      next: (result) => {
        if (result) {
          this.loadProvinces();
        }
      }
    });
  }

  loadProvinces(): void {
    this.loadParams();
    this.provinceService.getProvincesTableList(this.filterParams).subscribe({
      next: (result) => {
        if(result.isSuccessful) {
          this.isLoading = false;
          this.tableIsLoading = false;

          this.totalRecords = result.totalRecords;
          this.provincesList = result.response;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.tableIsLoading = false;
        console.log(err);
      }
    });
  }

  goToAddProvince(): void {
    this.router.navigate(['settings/provinces', {outlets: {modal: 'form/new'}}]);
  }

  getStatusClass(status: boolean): string {
    return status ? 'success' : 'danger';
  }

  changeProvinceStatus(province: ProvinceView): void {
    const statusChange: StatusChange = { active: !province.active };
    this.confirmDialogHeader = 'Status Change';

    this.confirmationService.confirm({
      message: `You want to ${province.active ? 'Deactivate' : 'Activate'} ${province.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.provinceService.changeProvinceStatus(statusChange, province.id).subscribe({
          next: (result) => {
            this.provinceChangesResponse(province.name, result.isSuccessful, result.errorMessage, 'successfully updated');
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }

  provinceChangesResponse(name: string, isSuccessful: boolean, errorMessage: string, msg: string): void {
    if(isSuccessful) {
      this.sharedService.showSuccessMessage(`${name} ${msg}!`);
      this.tableIsLoading = true;
      this.loadProvinces();
    } else {
      this.sharedService.showErrorMessage(errorMessage);
    }
  }

  goToEditProvince(province: ProvinceView): void {
    this.router.navigate(['settings/provinces', {outlets: {modal: 'form/edit/' + province.id}}]);
  }

  deleteProvince(province: ProvinceView): void {
    this.confirmDialogHeader = 'Delete'; 

    this.confirmationService.confirm({
      message: `You want to delete ${province.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.provinceService.deleteProvince(province.id).subscribe({
          next: (result) => {
            this.provinceChangesResponse(province.name, result.isSuccessful, result.errorMessage, 'successfully deleted');
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.pageSize = event.rows;

    this.tableIsLoading = true;
    this.loadProvinces();
  }

  searchData(event: any): void {
    if(event.target.value?.length >= 3) {
      this.inputSearch = event.target.value;
      this.inputChangeHasLoaded = false;

      this.tableIsLoading = true;
      this.loadProvinces();
    } else {
      if (!this.inputChangeHasLoaded) {
        this.inputSearch = '';
        this.inputChangeHasLoaded = true;

        this.tableIsLoading = true;
        this.loadProvinces();
      }
    }
  }

  loadParams(): void {
    this.filterParams = [];
    if (this.inputSearch != '' && this.inputSearch != null) {
      this.filterParams.push(
        { paramName: 'Name', paramValue: this.inputSearch},
        { paramName: 'Code', paramValue: this.inputSearch},
        { paramName: 'CountryName', paramValue: this.inputSearch}
      );
    }
    this.filterParams.push(
      { paramName: 'CurrentPage', paramValue: this.currentPage},
      { paramName: 'PageSize', paramValue: this.pageSize}
    );
  }

  ngOnDestroy(): void {
    this.provinceListSubscription.unsubscribe();
  }
}
