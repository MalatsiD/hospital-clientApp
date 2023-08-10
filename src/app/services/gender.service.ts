import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { GenderDto } from '../shared/dtos/gender-dto';
import { GenderPaginatedResponseView, GenderResponseView, GenderSingleResponseView } from '../shared/interfaces/genderView';
import { Observable } from 'rxjs';
import { StatusChange } from '../shared/interfaces/status-change';
import { FilterParamList } from '../shared/interfaces/filter-params';

const controllerName = 'Gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private apiService: ApiService) { }

  addGender(data: GenderDto): Observable<GenderSingleResponseView> {
    return this.apiService.post(controllerName, data);
  }

  updateGender(data: GenderDto, id: number): Observable<GenderSingleResponseView> {
    return this.apiService.put(`${controllerName}/${id}`, data);
  }

  changeGenderStatus(data: StatusChange, id: number): Observable<GenderSingleResponseView> {
    return this.apiService.put(`${controllerName}/ChangeGenderStatus/${id}`, data);
  }

  deleteGender(id:number): Observable<GenderSingleResponseView> {
    return this.apiService.delete(`${controllerName}/${id}`);
  }

  getSingleGender(id: number): Observable<GenderSingleResponseView> {
    return this.apiService.get(`${controllerName}/${id}`);
  }

  getRolesList(id: number = 0, active: boolean = true): Observable<GenderResponseView> {
    return this.apiService.get(`${controllerName}/GenderList/${id}/${active}`);
  }

  getGendersTableList(queryParams?: FilterParamList): Observable<GenderPaginatedResponseView> {
    return this.apiService.get(controllerName, queryParams);
  }
  
}
