import { StatusChange } from './../../../shared/interfaces/status-change';
import { DataService } from 'src/app/shared/services/data.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { GenderService } from './../../../services/gender.service';
import { FilterParamList } from 'src/app/shared/interfaces/filter-params';
import { GenderView, GenderViewList } from './../../../shared/interfaces/genderView';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

@Component({
  selector: 'app-genders',
  templateUrl: './genders.component.html',
  styleUrls: ['./genders.component.scss']
})
export class GendersComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  tableIsLoading: boolean = false;
  gendersList: GenderViewList = [];

  paginationValues: number[] = [];
  filterParams: FilterParamList = [];

  confirmDialogHeader: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  inputSearch: string = '';
  inputChangeHasLoaded: boolean = true;

  roleListSubscription = new Subscription();

  fakeData: any[] = [];
  fakeColumns: string[] = [];

  constructor(
    private genderService: GenderService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadSkeleton();
    this.loadGenders();
    this.detectGenderDataChanges();
    this.paginationValues = this.sharedService.getTablePaginatorValues();
  }

  loadSkeleton(): void {
    this.fakeData = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    this.fakeColumns = ['Name', 'Description', 'Status', ''];
  }

  refreshData(): void {
    this.isLoading = true;
    this.loadGenders();
  }

  detectGenderDataChanges(): void {
    this.roleListSubscription = this.dataService.getGenderSingleData().subscribe({
      next: (result) => {
        if (result) {
          this.loadGenders();
        }
      }
    });
  }

  loadGenders() : void {
    this.loadParams();
    this.genderService.getGendersTableList(this.filterParams).subscribe({
      next: (result) => {
        if(result.isSuccessful) {
          this.totalRecords = result.totalRecords;
          this.gendersList = result.response;
        }

        this.isLoading = false;
        this.tableIsLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.tableIsLoading = false;
        const errorResult = err.error as ApiResponse;
        this.sharedService.showErrorMessage(errorResult.errorMessage);
      }
    });
  }

  goToAddGender(): void {
    this.router.navigate(['settings/genders', {outlets: {modal: 'form/new'}}]);
  }

  getStatusClass(status: boolean): string {
    return status ? 'success' : 'danger';
  }

  changeGenderStatus(gender: GenderView): void {
    const statusChange: StatusChange = { active: !gender.active };
    this.confirmDialogHeader = 'Status Change';

    this.confirmationService.confirm({
      message: `You want to ${gender.active ? 'Deactivate' : 'Activate'} ${gender.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.genderService.changeGenderStatus(statusChange, gender.id).subscribe({
          next: (result) => {
            this.genderChangesResponse(gender.name, result.isSuccessful, result.errorMessage, 'successfully updated');
          },
          error: (err) => {
            const errorResult = err.error as ApiResponse;
            this.sharedService.showErrorMessage(errorResult.errorMessage);
          }
        });
      }
    });
  }

  genderChangesResponse(name: string, isSuccessful: boolean, errorMessage: string, msg: string): void {
    if(isSuccessful) {
      this.sharedService.showSuccessMessage(`${name} ${msg}!`);
      this.tableIsLoading = true;
      this.loadGenders();
    } else {
      this.sharedService.showErrorMessage(errorMessage);
    }
  }

  goToEditGender(gender: GenderView): void {
    this.router.navigate(['settings/genders', {outlets: {modal: 'form/edit/' + gender.id}}]);
  }

  deleteGender(gender: GenderView): void {
    this.confirmDialogHeader = 'Delete'; 

    this.confirmationService.confirm({
      message: `You want to delete ${gender.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.genderService.deleteGender(gender.id).subscribe({
          next: (result) => {
            this.genderChangesResponse(gender.name, result.isSuccessful, result.errorMessage, 'successfully deleted');
          },
          error: (err) => {
            const errorResult = err.error as ApiResponse;
            this.sharedService.showErrorMessage(errorResult.errorMessage);
          }
        })
      }
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.pageSize = event.rows;

    this.tableIsLoading = true;
    this.loadGenders();
  }

  searchData(event: any): void {
    if(event.target.value?.length >= 3) {
      this.inputSearch = event.target.value;
      this.inputChangeHasLoaded = false;

      this.tableIsLoading = true;
      this.loadGenders();
    } else {
      if (!this.inputChangeHasLoaded) {
        this.inputSearch = '';
        this.inputChangeHasLoaded = true;

        this.tableIsLoading = true;
        this.loadGenders();
      }
    }
  }

  loadParams(): void {
    this.filterParams = [];
    if (this.inputSearch != '' && this.inputSearch != null) {
      this.filterParams.push(
        { paramName: 'Name', paramValue: this.inputSearch}
      );
    }
    this.filterParams.push(
      { paramName: 'CurrentPage', paramValue: this.currentPage},
      { paramName: 'PageSize', paramValue: this.pageSize}
    );
  }

  ngOnDestroy(): void {
    this.roleListSubscription.unsubscribe();
  }
}
