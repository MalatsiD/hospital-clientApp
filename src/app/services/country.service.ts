import { StatusChange } from './../shared/interfaces/status-change';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { CountryPaginatedResponseView, CountryResponseView, CountrySingleResponseView } from '../shared/interfaces/countryView';
import { FilterParamList } from '../shared/interfaces/filter-params';
import { CountryDto } from '../shared/dtos/country-dto';

const controllerName = 'country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private apiService: ApiService) { }

  addCountry(data: CountryDto): Observable<CountrySingleResponseView> {
    return this.apiService.post(controllerName, data);
  }

  updateCountry(data: CountryDto, id: number): Observable<CountrySingleResponseView> {
    return this.apiService.put(`${controllerName}/${id}`, data);
  }

  changeCountryStatus(data: StatusChange, id: number): Observable<CountrySingleResponseView> {
    return this.apiService.put(`${controllerName}/ChangeCountryStatus/${id}`, data);
  }

  deleteCountry(id: number): Observable<CountrySingleResponseView> {
    return this.apiService.delete(`${controllerName}/${id}`);
  }

  getCountryList(active: boolean = true): Observable<CountryResponseView> {
    return this.apiService.get(`${controllerName}/CountryList/${active}`);
  }

  getCountryTableList(queryParams?: FilterParamList): Observable<CountryPaginatedResponseView> {
    return this.apiService.get(controllerName, queryParams);
  }

  getSingleCountry(id: number): Observable<CountrySingleResponseView> {
    return this.apiService.get(`${controllerName}/${id}`);
  }
}
