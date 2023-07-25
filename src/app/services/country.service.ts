import { StatusChange } from './../shared/interfaces/status-change';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { CountryResponseView } from '../shared/interfaces/countryView';
import { FilterParamList } from '../shared/interfaces/filter-params';

const controllerName = 'country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private apiService: ApiService) { }

  changeCountryStatus(data: StatusChange, id: number): Observable<CountryResponseView> {
    return this.apiService.put(`${controllerName}/ChangeCountryStatus/${id}`, data);
  }

  deleteCountry(id: number): Observable<CountryResponseView> {
    return this.apiService.delete(`${controllerName}/${id}`);
  }

  getCountryList(queryParams?: FilterParamList): Observable<CountryResponseView> {
    return this.apiService.get(controllerName, queryParams);
  }
}
