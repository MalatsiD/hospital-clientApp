import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { CityDto } from '../shared/dtos/city-dto';
import { CityPaginatedResponseView, CityResponseView, CitySingleResponseView } from '../shared/interfaces/cityView';
import { StatusChange } from '../shared/interfaces/status-change';
import { Observable } from 'rxjs';
import { FilterParamList } from '../shared/interfaces/filter-params';

const controllerName = 'city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private apiService: ApiService) { }

  addCity(data: CityDto): Observable<CitySingleResponseView> {
    return this.apiService.post(controllerName, data);
  }

  updateCity(data: CityDto, id: number): Observable<CitySingleResponseView> {
    return this.apiService.put(`${controllerName}/${id}`, data);
  }

  changeCityStatus(data: StatusChange, id: number): Observable<CitySingleResponseView> {
    return this.apiService.put(`${controllerName}/ChangeCityStatus/${id}`, data);
  }

  deleteCity(id:number): Observable<CitySingleResponseView> {
    return this.apiService.delete(`${controllerName}/${id}`);
  }

  getSingleCity(id: number): Observable<CitySingleResponseView> {
    return this.apiService.get(`${controllerName}/${id}`);
  }

  getCitiesList(active: boolean = true): Observable<CityResponseView> {
    return this.apiService.get(`${controllerName}/CityList/${active}`);
  }

  getCitiesTableList(queryParams?: FilterParamList): Observable<CityPaginatedResponseView> {
    return this.apiService.get(controllerName, queryParams);
  }
}
