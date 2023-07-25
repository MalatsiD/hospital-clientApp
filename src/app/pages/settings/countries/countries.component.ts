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

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: []
})
export class CountriesComponent implements OnInit {

  countryViewList: CountryViewList = [];
  paginationValues: number[] = [];
  filterParams: FilterParamList = [];

  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  inputSearch: string = '';
  inputChangeHasLoaded: boolean = true;
  tableIsLoading: boolean = false;

  confirmDialogHeader: string = '';

  constructor(
    private countryService: CountryService, 
    private sharedService: SharedService,
    private confirmationService: ConfirmationService
    ) {}

  ngOnInit(): void {
    this.loadCountries();
    this.paginationValues = this.sharedService.getTablePaginatorValues();
  }

  loadCountries(): void {
    this.loadParams();
    this.countryService.getCountryList(this.filterParams).subscribe({
      next: (result) => {
        if(result.isSuccessful) {
          this.countryViewList = result.response;
          this.totalRecords = result.totalRecords;

          this.tableIsLoading = false;
        }  else {
          this.sharedService.showErrorMessage(result.errorMessage);
        }
      },
      error: (error) => {
        console.log(error);
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
          error: (error) => {
            console.log(error);
          }
        });
      }
    });

  }

  goToEditCountry(country: CountryView): void {
    console.log('Edit: ', country);
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
          error: (error) => {
            console.log(error);
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

}
