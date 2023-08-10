import { StatusChange } from './../../../shared/interfaces/status-change';
import { SharedService } from './../../../shared/services/shared.service';
import { HospitalService } from './../../../services/hospital.service';
import { OnDestroy } from '@angular/core';
import { HospitalView, HospitalViewList } from './../../../shared/interfaces/hospitalView';
import { Subject, Subscription } from 'rxjs';
import { FilterParamList } from './../../../shared/interfaces/filter-params';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DataService } from 'src/app/shared/services/data.service';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit, OnDestroy {

  hospitalViewList: HospitalViewList = [];
  paginationValues: number[] = [];
  filterParams: FilterParamList = [];

  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  inputSearch: string = '';
  inputChangeHasLoaded: boolean = true;
  tableIsLoading: boolean = false;
  isLoading: boolean = true;

  confirmDialogHeader: string = '';

  destroy = new Subject<any>();

  ref: DynamicDialogRef | undefined;

  fakeData: any[] = [];
  fakeColumns: string[] = [];

  hospitalChangeSubscription = new Subscription();
  
  constructor(
    private hospitalService: HospitalService, 
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadSkeleton();
    this.loadHospitals();
    this.detectHospitalDataChanges();
    this.paginationValues = this.sharedService.getTablePaginatorValues();
  }

  loadSkeleton(): void {
    this.fakeData = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    this.fakeColumns = ['Name', 'Phone Number', 'Email', 'Reg Number', 'Status', ''];
  }

  detectHospitalDataChanges(): void {
    this.hospitalChangeSubscription = this.dataService.getHospitalSingleData().subscribe({
      next: (result) => {
        if (result) {
          this.loadHospitals();
        }
      }
    });
  }

  loadHospitals(): void {
    this.loadParams();
    this.hospitalService.getHospitalTableList(this.filterParams).subscribe({
      next: (result) => {
        if(result.isSuccessful) {
          this.hospitalViewList = result.response;
          this.totalRecords = result.totalRecords;

          this.isLoading = false;
          this.tableIsLoading = false;
        }  else {
          this.isLoading = false;
          this.tableIsLoading = false;
          this.sharedService.showErrorMessage(result.errorMessage);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.tableIsLoading = false;
        const errorResult = err.error as ApiResponse;
        this.sharedService.showErrorMessage(errorResult.errorMessage);
      }
    })
  }

  getStatusClass(status: boolean): string {
    return status ? 'success' : 'danger';
  }

  changeHospitalStatus(hospital: HospitalView): void {
    const statusChange: StatusChange = { active: !hospital.active };
    this.confirmDialogHeader = 'Status Change';

    this.confirmationService.confirm({
      message: `You want to ${hospital.active ? 'Deactivate' : 'Activate'} ${hospital.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.hospitalService.changeHospitalStatus(statusChange, hospital.id).subscribe({
          next: (result) => {
            this.hospitalChangesResponse(hospital.name, result.isSuccessful, result.errorMessage, 'successfully updated');
          },
          error: (err) => {
            const errorResult = err.error as ApiResponse;
            this.sharedService.showErrorMessage(errorResult.errorMessage);
          }
        });
      }
    });

  }

  goToAddHospital(): void {
    this.router.navigate(['settings/hospitals', {outlets: {modal: 'form/new'}}]);
  }

  refreshData(): void {
    this.tableIsLoading = true;
    this.loadHospitals();
  }

  goToEditHospital(hospital: HospitalView): void {
    this.router.navigate(['settings/hospitals', {outlets: {modal: 'form/edit/' + hospital.id}}]);
  }

  deleteHospital(hospital: HospitalView): void {
    this.confirmDialogHeader = 'Delete'; 

    this.confirmationService.confirm({
      message: `You want to delete ${hospital.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.hospitalService.deleteHospital(hospital.id).subscribe({
          next: (result) => {
            this.hospitalChangesResponse(hospital.name, result.isSuccessful, result.errorMessage, 'successfully deleted');
          },
          error: (err) => {
            const errorResult = err.error as ApiResponse;
            this.sharedService.showErrorMessage(errorResult.errorMessage);
          }
        })
      }
    });
  }

  hospitalChangesResponse(name: string, isSuccessful: boolean, errorMessage: string, msg: string): void {
    if(isSuccessful) {
      this.sharedService.showSuccessMessage(`${name} ${msg}!`);
      this.tableIsLoading = true;
      this.loadHospitals();
    } else {
      this.sharedService.showErrorMessage(errorMessage);
    }
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.pageSize = event.rows;

    this.tableIsLoading = true;
    this.loadHospitals();
  }

  searchData(event: any): void {  
    if(event.target.value?.length >= 3) {
      this.inputSearch = event.target.value;
      this.inputChangeHasLoaded = false;

      this.tableIsLoading = true;
      this.loadHospitals();
    } else {
      if (!this.inputChangeHasLoaded) {
        this.inputSearch = '';
        this.inputChangeHasLoaded = true;

        this.tableIsLoading = true;
        this.loadHospitals();
      }
    }
  }

  loadParams(): void {
    this.filterParams = [];
    if (this.inputSearch != '' && this.inputSearch != null) {
      this.filterParams.push(
        { paramName: 'Name', paramValue: this.inputSearch},
        { paramName: 'RegistrationNumber', paramValue: this.inputSearch}
      );
    }
    this.filterParams.push(
      { paramName: 'CurrentPage', paramValue: this.currentPage},
      { paramName: 'PageSize', paramValue: this.pageSize}
    );
  }

  ngOnDestroy(): void {
    this.hospitalChangeSubscription.unsubscribe();
  }
}
