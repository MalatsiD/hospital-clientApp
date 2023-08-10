import { Injectable } from '@angular/core';
import { AilmentPaginatedResponseView, AilmentResponseView, AilmentSingleResponseView } from '../shared/interfaces/ailmentView';
import { Observable } from 'rxjs';
import { AilmentDto } from '../shared/dtos/ailment-dto';
import { ApiService } from '../shared/services/api.service';
import { StatusChange } from '../shared/interfaces/status-change';
import { FilterParamList } from '../shared/interfaces/filter-params';

const controllerName = 'Ailment';

@Injectable({
  providedIn: 'root'
})
export class AilmentService {

  constructor(private apiService: ApiService) { }

  addAilment(data: AilmentDto): Observable<AilmentSingleResponseView> {
    return this.apiService.post(controllerName, data);
  }

  updateAilment(data: AilmentDto, id: number): Observable<AilmentSingleResponseView> {
    return this.apiService.put(`${controllerName}/${id}`, data);
  }

  changeAilmentStatus(data: StatusChange, id: number): Observable<AilmentSingleResponseView> {
    return this.apiService.put(`${controllerName}/ChangeAilmentStatus/${id}`, data);
  }

  deleteAilment(id: number): Observable<AilmentSingleResponseView> {
    return this.apiService.delete(`${controllerName}/${id}`);
  }

  getAilmentList(active: boolean = true): Observable<AilmentResponseView> {
    return this.apiService.get(`${controllerName}/AilmentList/${active}`);
  }

  getAilmentTableList(queryParams?: FilterParamList): Observable<AilmentPaginatedResponseView> {
    return this.apiService.get(controllerName, queryParams);
  }

  getSingleAilment(id: number): Observable<AilmentSingleResponseView> {
    return this.apiService.get(`${controllerName}/${id}`);
  }
}
