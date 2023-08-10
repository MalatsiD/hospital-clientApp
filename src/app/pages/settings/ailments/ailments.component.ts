import { StatusChange } from './../../../shared/interfaces/status-change';
import { AilmentService } from './../../../services/ailment.service';
import { DataService } from 'src/app/shared/services/data.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AilmentView, AilmentViewList } from './../../../shared/interfaces/ailmentView';
import { FilterParamList } from 'src/app/shared/interfaces/filter-params';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

@Component({
  selector: 'app-ailments',
  templateUrl: './ailments.component.html',
  styleUrls: ['./ailments.component.scss']
})
export class AilmentsComponent {
  isLoading: boolean = true;
  tableIsLoading: boolean = false;
  ailmentsList: AilmentViewList = [];

  paginationValues: number[] = [];
  filterParams: FilterParamList = [];

  confirmDialogHeader: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  inputSearch: string = '';
  inputChangeHasLoaded: boolean = true;

  ailmentListSubscription = new Subscription();

  fakeData: any[] = [];
  fakeColumns: string[] = [];

  constructor(
    private ailmentService: AilmentService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dataService: DataService
  ) {}
  

  ngOnInit(): void {
    this.loadSkeleton();
    this.loadAilments();
    this.detectAilmentDataChanges();
    this.paginationValues = this.sharedService.getTablePaginatorValues();
  }

  loadSkeleton(): void {
    this.fakeData = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    this.fakeColumns = ['Name', 'Description', 'Status', ''];
  }

  refreshData(): void {
    this.isLoading = true;
    this.loadAilments();
  }

  detectAilmentDataChanges(): void {
    this.ailmentListSubscription = this.dataService.getAilmentSingleData().subscribe({
      next: (result) => {
        if (result) {
          this.loadAilments();
        }
      }
    });
  }

  loadAilments(): void {
    this.loadParams();
    this.ailmentService.getAilmentTableList(this.filterParams).subscribe({
      next: (result) => {
        if(result.isSuccessful) {
          this.totalRecords = result.totalRecords;
          this.ailmentsList = result.response;
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

  goToAddAilment(): void {
    this.router.navigate(['settings/ailments', {outlets: {modal: 'form/new'}}]);
  }

  getStatusClass(status: boolean): string {
    return status ? 'success' : 'danger';
  }

  changeAilmentStatus(ailment: AilmentView): void {
    const statusChange: StatusChange = { active: !ailment.active };
    this.confirmDialogHeader = 'Status Change';

    this.confirmationService.confirm({
      message: `You want to ${ailment.active ? 'Deactivate' : 'Activate'} ${ailment.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.ailmentService.changeAilmentStatus(statusChange, ailment.id).subscribe({
          next: (result) => {
            this.ailmentChangesResponse(ailment.name, result.isSuccessful, result.errorMessage, 'successfully updated');
          },
          error: (err) => {
            const errorResult = err.error as ApiResponse;
            this.sharedService.showErrorMessage(errorResult.errorMessage);
          }
        });
      }
    });
  }

  ailmentChangesResponse(name: string, isSuccessful: boolean, errorMessage: string, msg: string): void {
    if(isSuccessful) {
      this.sharedService.showSuccessMessage(`${name} ${msg}!`);
      this.tableIsLoading = true;
      this.loadAilments();
    } else {
      this.sharedService.showErrorMessage(errorMessage);
    }
  }

  goToEditAilment(ailment: AilmentView): void {
    this.router.navigate(['settings/ailments', {outlets: {modal: 'form/edit/' + ailment.id}}]);
  }

  deleteAilment(ailment: AilmentView): void {
    this.confirmDialogHeader = 'Delete'; 

    this.confirmationService.confirm({
      message: `You want to delete ${ailment.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.ailmentService.deleteAilment(ailment.id).subscribe({
          next: (result) => {
            this.ailmentChangesResponse(ailment.name, result.isSuccessful, result.errorMessage, 'successfully deleted');
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
    this.loadAilments();
  }

  searchData(event: any): void {
    if(event.target.value?.length >= 3) {
      this.inputSearch = event.target.value;
      this.inputChangeHasLoaded = false;

      this.tableIsLoading = true;
      this.loadAilments();
    } else {
      if (!this.inputChangeHasLoaded) {
        this.inputSearch = '';
        this.inputChangeHasLoaded = true;

        this.tableIsLoading = true;
        this.loadAilments();
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

}
