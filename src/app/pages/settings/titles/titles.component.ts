import { StatusChange } from './../../../shared/interfaces/status-change';
import { DataService } from 'src/app/shared/services/data.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TitleService } from './../../../services/title.service';
import { FilterParamList } from 'src/app/shared/interfaces/filter-params';
import { TitleView, TitleViewList } from './../../../shared/interfaces/titleView';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.scss']
})
export class TitlesComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  tableIsLoading: boolean = false;
  titlesList: TitleViewList = [];

  paginationValues: number[] = [];
  filterParams: FilterParamList = [];

  confirmDialogHeader: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  inputSearch: string = '';
  inputChangeHasLoaded: boolean = true;

  titleListSubscription = new Subscription();

  fakeData: any[] = [];
  fakeColumns: string[] = [];

  constructor(
    private titleService: TitleService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadSkeleton();
    this.loadTitles();
    this.detectTitleDataChanges();
    this.paginationValues = this.sharedService.getTablePaginatorValues();
  }

  loadSkeleton(): void {
    this.fakeData = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    this.fakeColumns = ['Name', 'Description', 'Status', ''];
  }

  refreshData(): void {
    this.isLoading = true;
    this.loadTitles();
  }

  detectTitleDataChanges(): void {
    this.titleListSubscription = this.dataService.getTitleSingleData().subscribe({
      next: (result) => {
        if (result) {
          this.loadTitles();
        }
      }
    });
  }

  loadTitles() : void {
    this.loadParams();
    this.titleService.getTitlesTableList(this.filterParams).subscribe({
      next: (result) => {
        if(result.isSuccessful) {
          this.isLoading = false;
          this.tableIsLoading = false;

          this.totalRecords = result.totalRecords;
          this.titlesList = result.response;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.tableIsLoading = false;
        const errorResult = err.error as ApiResponse;
        this.sharedService.showErrorMessage(errorResult.errorMessage);
      }
    });
  }

  goToAddTitle(): void {
    this.router.navigate(['settings/titles', {outlets: {modal: 'form/new'}}]);
  }

  getStatusClass(status: boolean): string {
    return status ? 'success' : 'danger';
  }

  changeTitleStatus(title: TitleView): void {
    const statusChange: StatusChange = { active: !title.active };
    this.confirmDialogHeader = 'Status Change';

    this.confirmationService.confirm({
      message: `You want to ${title.active ? 'Deactivate' : 'Activate'} ${title.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.titleService.changeTitleStatus(statusChange, title.id).subscribe({
          next: (result) => {
            this.titleChangesResponse(title.name, result.isSuccessful, result.errorMessage, 'successfully updated');
          },
          error: (err) => {
            const errorResult = err.error as ApiResponse;
            this.sharedService.showErrorMessage(errorResult.errorMessage);
          }
        });
      }
    });
  }

  titleChangesResponse(name: string, isSuccessful: boolean, errorMessage: string, msg: string): void {
    if(isSuccessful) {
      this.sharedService.showSuccessMessage(`${name} ${msg}!`);
      this.tableIsLoading = true;
      this.loadTitles();
    } else {
      this.sharedService.showErrorMessage(errorMessage);
    }
  }

  goToEditTitle(title: TitleView): void {
    this.router.navigate(['settings/titles', {outlets: {modal: 'form/edit/' + title.id}}]);
  }

  deleteTitle(title: TitleView): void {
    this.confirmDialogHeader = 'Delete'; 

    this.confirmationService.confirm({
      message: `You want to delete ${title.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.titleService.deleteTitle(title.id).subscribe({
          next: (result) => {
            this.titleChangesResponse(title.name, result.isSuccessful, result.errorMessage, 'successfully deleted');
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
    this.loadTitles();
  }

  searchData(event: any): void {
    if(event.target.value?.length >= 3) {
      this.inputSearch = event.target.value;
      this.inputChangeHasLoaded = false;

      this.tableIsLoading = true;
      this.loadTitles();
    } else {
      if (!this.inputChangeHasLoaded) {
        this.inputSearch = '';
        this.inputChangeHasLoaded = true;

        this.tableIsLoading = true;
        this.loadTitles();
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
    this.titleListSubscription.unsubscribe();
  }
}
