import { OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DataService } from './../../../shared/services/data.service';
import { StatusChange } from './../../../shared/interfaces/status-change';
import { FilterParamList } from './../../../shared/interfaces/filter-params';
import { PaginatorEvent } from './../../../shared/interfaces/paginator-event';
import { SharedService } from './../../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { CountryView, CountryViewList } from 'src/app/shared/interfaces/countryView';

import {cloneDeep} from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CountryFormComponent } from './country-form/country-form.component';
import { Location } from '@angular/common';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: [DialogService]
})
export class CountriesComponent implements OnInit, OnDestroy {

  countryViewList: CountryViewList = [];
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

  countryChangeSubscription = new Subscription();

  constructor(
    private countryService: CountryService, 
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dataService: DataService
    ) {}

  ngOnInit(): void {
    this.loadSkeleton();
    this.loadCountries();
    this.detectCountryDataChanges();
    this.paginationValues = this.sharedService.getTablePaginatorValues();
  }

  loadSkeleton(): void {
    this.fakeData = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    this.fakeColumns = ['Name', 'Code', 'Description', 'Status', ''];
  }

  detectCountryDataChanges(): void {
    this.countryChangeSubscription = this.dataService.getCountrySingleData().subscribe({
      next: (result) => {
        if (result) {
          this.loadCountries();
        }
      }
    });
  }

  loadCountries(): void {
    this.loadParams();
    this.countryService.getCountryTableList(this.filterParams).subscribe({
      next: (result) => {
        if(result.isSuccessful) {
          this.countryViewList = result.response;
          this.totalRecords = result.totalRecords;

          this.isLoading = false;
          this.tableIsLoading = false;
        }  else {
          this.isLoading = false;
          this.tableIsLoading = false;
          this.sharedService.showInformationMessage(result.errorMessage);
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

  changeCountryStatus(country: CountryView): void {
    const statusChange: StatusChange = { active: !country.active };
    this.confirmDialogHeader = 'Status Change';

    this.confirmationService.confirm({
      message: `You want to ${country.active ? 'Deactivate' : 'Activate'} ${country.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.countryService.changeCountryStatus(statusChange, country.id).subscribe({
          next: (result) => {
            this.countryChangesResponse(country.name, result.isSuccessful, result.errorMessage, 'successfully updated');
          },
          error: (err) => {
            const errorResult = err.error as ApiResponse;
            this.sharedService.showErrorMessage(errorResult.errorMessage);
          }
        });
      }
    });

  }

  goToAddCountry(): void {
    this.router.navigate(['settings/countries', {outlets: {modal: 'form/new'}}]);
  }

  refreshData(): void {
    this.tableIsLoading = true;
    this.loadCountries();
  }

  goToEditCountry(country: CountryView): void {
    this.router.navigate(['settings/countries', {outlets: {modal: 'form/edit/' + country.id}}]);
  }

  deleteCountry(country: CountryView): void {
    this.confirmDialogHeader = 'Delete'; 

    this.confirmationService.confirm({
      message: `You want to delete ${country.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.countryService.deleteCountry(country.id).subscribe({
          next: (result) => {
            this.countryChangesResponse(country.name, result.isSuccessful, result.errorMessage, 'successfully deleted');
          },
          error: (err) => {
            const errorResult = err.error as ApiResponse;
            this.sharedService.showErrorMessage(errorResult.errorMessage);
          }
        })
      }
    });
  }

  countryChangesResponse(name: string, isSuccessful: boolean, errorMessage: string, msg: string): void {
    if(isSuccessful) {
      this.sharedService.showSuccessMessage(`${name} ${msg}!`);
      this.tableIsLoading = true;
      this.loadCountries();
    } else {
      this.sharedService.showErrorMessage(errorMessage);
    }
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.pageSize = event.rows;

    this.tableIsLoading = true;
    this.loadCountries();
  }

  searchData(event: any): void {  
    if(event.target.value?.length >= 3) {
      this.inputSearch = event.target.value;
      this.inputChangeHasLoaded = false;

      this.tableIsLoading = true;
      this.loadCountries();
    } else {
      if (!this.inputChangeHasLoaded) {
        this.inputSearch = '';
        this.inputChangeHasLoaded = true;

        this.tableIsLoading = true;
        this.loadCountries();
      }
    }
  }

  loadParams(): void {
    this.filterParams = [];
    if (this.inputSearch != '' && this.inputSearch != null) {
      this.filterParams.push(
        { paramName: 'Name', paramValue: this.inputSearch},
        { paramName: 'Code', paramValue: this.inputSearch}
      );
    }
    this.filterParams.push(
      { paramName: 'CurrentPage', paramValue: this.currentPage},
      { paramName: 'PageSize', paramValue: this.pageSize}
    );
  }

  ngOnDestroy(): void {
    this.countryChangeSubscription.unsubscribe();
  }

}
