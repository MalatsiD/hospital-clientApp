import { StatusChange } from './../../../shared/interfaces/status-change';
import { OnDestroy } from '@angular/core';
import { DataService } from './../../../shared/services/data.service';
import { SharedService } from './../../../shared/services/shared.service';
import { AddressTypeService } from './../../../services/address-type.service';
import { FilterParamList } from './../../../shared/interfaces/filter-params';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddressTypeView, AddressTypeViewList } from 'src/app/shared/interfaces/addressTypeView';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-types',
  templateUrl: './address-types.component.html',
  styleUrls: ['./address-types.component.scss']
})
export class AddressTypesComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  tableIsLoading: boolean = false;
  addressTypesList: AddressTypeViewList = [];

  paginationValues: number[] = [];
  filterParams: FilterParamList = [];

  confirmDialogHeader: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  inputSearch: string = '';
  inputChangeHasLoaded: boolean = true;

  addressTypeListSubscription = new Subscription();

  fakeData: any[] = [];
  fakeColumns: string[] = [];

  constructor(
    private addressTypeService: AddressTypeService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadSkeleton();
    this.loadAddressTypes();
    this.detectAddressTypeDataChanges();
    this.paginationValues = this.sharedService.getTablePaginatorValues();
  }

  loadSkeleton(): void {
    this.fakeData = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    this.fakeColumns = ['Name', 'Description', 'Status', ''];
  }

  refreshData(): void {
    this.isLoading = true;
    this.loadAddressTypes();
  }

  detectAddressTypeDataChanges(): void {
    this.addressTypeListSubscription = this.dataService.getAddressTypeSingleData().subscribe({
      next: (result) => {
        if (result) {
          this.loadAddressTypes();
        }
      }
    });
  }

  loadAddressTypes(): void {
    this.loadParams();
    this.addressTypeService.getAddressTypesTableList(this.filterParams).subscribe({
      next: (result) => {
        if(result.isSuccessful) {
          this.isLoading = false;
          this.tableIsLoading = false;

          this.totalRecords = result.totalRecords;
          this.addressTypesList = result.response;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.tableIsLoading = false;
        console.log(err);
      }
    });
  }

  goToAddAddressType(): void {
    this.router.navigate(['settings/address-types', {outlets: {modal: 'form/new'}}]);
  }

  getStatusClass(status: boolean): string {
    return status ? 'success' : 'danger';
  }

  changeAddressTypeStatus(addressType: AddressTypeView): void {
    const statusChange: StatusChange = { active: !addressType.active };
    this.confirmDialogHeader = 'Status Change';

    this.confirmationService.confirm({
      message: `You want to ${addressType.active ? 'Deactivate' : 'Activate'} ${addressType.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.addressTypeService.changeAddressTypeStatus(statusChange, addressType.id).subscribe({
          next: (result) => {
            this.addressTypeChangesResponse(addressType.name, result.isSuccessful, result.errorMessage, 'successfully updated');
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }

  addressTypeChangesResponse(name: string, isSuccessful: boolean, errorMessage: string, msg: string): void {
    if(isSuccessful) {
      this.sharedService.showSuccessMessage(`${name} ${msg}!`);
      this.tableIsLoading = true;
      this.loadAddressTypes();
    } else {
      this.sharedService.showErrorMessage(errorMessage);
    }
  }

  goToEditAddressTypes(addressType: AddressTypeView): void {
    this.router.navigate(['settings/address-types', {outlets: {modal: 'form/edit/' + addressType.id}}]);
  }

  deleteAddressType(addressType: AddressTypeView): void {
    this.confirmDialogHeader = 'Delete'; 

    this.confirmationService.confirm({
      message: `You want to delete ${addressType.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.addressTypeService.deleteAddressType(addressType.id).subscribe({
          next: (result) => {
            this.addressTypeChangesResponse(addressType.name, result.isSuccessful, result.errorMessage, 'successfully deleted');
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
    this.loadAddressTypes();
  }

  searchData(event: any): void {
    if(event.target.value?.length >= 3) {
      this.inputSearch = event.target.value;
      this.inputChangeHasLoaded = false;

      this.tableIsLoading = true;
      this.loadAddressTypes();
    } else {
      if (!this.inputChangeHasLoaded) {
        this.inputSearch = '';
        this.inputChangeHasLoaded = true;

        this.tableIsLoading = true;
        this.loadAddressTypes();
      }
    }
  }

  loadParams(): void {
    this.filterParams = [];
    if (this.inputSearch != '' && this.inputSearch != null) {
      this.filterParams.push(
        { paramName: 'Name', paramValue: this.inputSearch},
      );
    }
    this.filterParams.push(
      { paramName: 'CurrentPage', paramValue: this.currentPage},
      { paramName: 'PageSize', paramValue: this.pageSize}
    );
  }

  ngOnDestroy(): void {
    this.addressTypeListSubscription.unsubscribe();
  }

}
