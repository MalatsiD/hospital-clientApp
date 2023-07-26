import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Observable } from 'rxjs';
import { FilterParamList } from '../shared/interfaces/filter-params';
import { StatusChange } from '../shared/interfaces/status-change';
import { ProvinceDto } from '../shared/dtos/province-dto';
import { ProvincePaginatedResponseView, ProvinceResponseView, ProvinceSingleResponseView } from '../shared/interfaces/provinceView';

const controllerName = 'province';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private apiService: ApiService) { }

  addProvince(data: ProvinceDto): Observable<ProvinceSingleResponseView> {
    return this.apiService.post(controllerName, data);
  }

  updateProvince(data: ProvinceDto, id: number): Observable<ProvinceSingleResponseView> {
    return this.apiService.put(`${controllerName}/${id}`, data);
  }

  changeProvinceStatus(data: StatusChange, id: number): Observable<ProvinceSingleResponseView> {
    return this.apiService.put(`${controllerName}/ChangeProvinceStatus/${id}`, data);
  }

  deleteProvince(id:number): Observable<ProvinceSingleResponseView> {
    return this.apiService.delete(`${controllerName}/${id}`);
  }

  getSingleProvince(id: number): Observable<ProvinceSingleResponseView> {
    return this.apiService.get(`${controllerName}/${id}`);
  }

  getProvincesList(active: boolean = true): Observable<ProvinceResponseView> {
    return this.apiService.get(`${controllerName}/ProvinceList/${active}`);
  }

  getProvincesTableList(queryParams?: FilterParamList): Observable<ProvincePaginatedResponseView> {
    return this.apiService.get(controllerName, queryParams);
  }
}
