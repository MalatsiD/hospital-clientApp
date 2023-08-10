import { OnDestroy } from '@angular/core';
import { StatusChange } from './../../../shared/interfaces/status-change';
import { CityView } from './../../../shared/interfaces/cityView';
import { CityService } from './../../../services/city.service';
import { DataService } from './../../../shared/services/data.service';
import { SharedService } from './../../../shared/services/shared.service';
import { FilterParamList } from './../../../shared/interfaces/filter-params';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CityViewList } from 'src/app/shared/interfaces/cityView';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  tableIsLoading: boolean = false;
  citiesList: CityViewList = [];

  paginationValues: number[] = [];
  filterParams: FilterParamList = [];

  confirmDialogHeader: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  inputSearch: string = '';
  inputChangeHasLoaded: boolean = true;

  cityListSubscription = new Subscription();

  fakeData: any[] = [];
  fakeColumns: string[] = [];

  constructor(
    private cityService: CityService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dataService: DataService
  ) {}
  

  ngOnInit(): void {
    this.loadSkeleton();
    this.loadCities();
    this.detectCityDataChanges();
    this.paginationValues = this.sharedService.getTablePaginatorValues();
  }

  loadSkeleton(): void {
    this.fakeData = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    this.fakeColumns = ['Name', 'Description', 'Province', 'Status', ''];
  }

  refreshData(): void {
    this.isLoading = true;
    this.loadCities();
  }

  detectCityDataChanges(): void {
    this.cityListSubscription = this.dataService.getCitySingleData().subscribe({
      next: (result) => {
        if (result) {
          this.loadCities();
        }
      }
    });
  }

  loadCities(): void {
    this.loadParams();
    this.cityService.getCitiesTableList(this.filterParams).subscribe({
      next: (result) => {
        if(result.isSuccessful) {
          this.totalRecords = result.totalRecords;
          this.citiesList = result.response;
        }

        this.isLoading = false;
        this.tableIsLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.tableIsLoading = false;
        console.log(err);
      }
    });
  }

  goToAddCity(): void {
    this.router.navigate(['settings/cities', {outlets: {modal: 'form/new'}}]);
  }

  getStatusClass(status: boolean): string {
    return status ? 'success' : 'danger';
  }

  changeCityStatus(city: CityView): void {
    const statusChange: StatusChange = { active: !city.active };
    this.confirmDialogHeader = 'Status Change';

    this.confirmationService.confirm({
      message: `You want to ${city.active ? 'Deactivate' : 'Activate'} ${city.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.cityService.changeCityStatus(statusChange, city.id).subscribe({
          next: (result) => {
            this.cityChangesResponse(city.name, result.isSuccessful, result.errorMessage, 'successfully updated');
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }

  cityChangesResponse(name: string, isSuccessful: boolean, errorMessage: string, msg: string): void {
    if(isSuccessful) {
      this.sharedService.showSuccessMessage(`${name} ${msg}!`);
      this.tableIsLoading = true;
      this.loadCities();
    } else {
      this.sharedService.showErrorMessage(errorMessage);
    }
  }

  goToEditCity(city: CityView): void {
    this.router.navigate(['settings/cities', {outlets: {modal: 'form/edit/' + city.id}}]);
  }

  deleteCity(city: CityView): void {
    this.confirmDialogHeader = 'Delete'; 

    this.confirmationService.confirm({
      message: `You want to delete ${city.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.cityService.deleteCity(city.id).subscribe({
          next: (result) => {
            this.cityChangesResponse(city.name, result.isSuccessful, result.errorMessage, 'successfully deleted');
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
    this.loadCities();
  }

  searchData(event: any): void {
    if(event.target.value?.length >= 3) {
      this.inputSearch = event.target.value;
      this.inputChangeHasLoaded = false;

      this.tableIsLoading = true;
      this.loadCities();
    } else {
      if (!this.inputChangeHasLoaded) {
        this.inputSearch = '';
        this.inputChangeHasLoaded = true;

        this.tableIsLoading = true;
        this.loadCities();
      }
    }
  }

  loadParams(): void {
    this.filterParams = [];
    if (this.inputSearch != '' && this.inputSearch != null) {
      this.filterParams.push(
        { paramName: 'Name', paramValue: this.inputSearch},
        { paramName: 'ProvinceName', paramValue: this.inputSearch}
      );
    }
    this.filterParams.push(
      { paramName: 'CurrentPage', paramValue: this.currentPage},
      { paramName: 'PageSize', paramValue: this.pageSize}
    );
  }

  ngOnDestroy(): void {
    this.cityListSubscription.unsubscribe();
  }

}
