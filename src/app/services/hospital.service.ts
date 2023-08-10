import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Observable } from 'rxjs';
import { HospitalPaginatedResponseView, HospitalResponseView, HospitalSingleResponseView } from '../shared/interfaces/hospitalView';
import { StatusChange } from '../shared/interfaces/status-change';
import { HospitalDto } from '../shared/dtos/hospital-dto';
import { FilterParamList } from '../shared/interfaces/filter-params';

const controllerName = 'Hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private apiService: ApiService) { }

  addHospital(data: HospitalDto): Observable<HospitalSingleResponseView> {
    return this.apiService.post(controllerName, data);
  }

  updateHospital(data: HospitalDto, id: number): Observable<HospitalSingleResponseView> {
    return this.apiService.put(`${controllerName}/${id}`, data);
  }

  changeHospitalStatus(data: StatusChange, id: number): Observable<HospitalSingleResponseView> {
    return this.apiService.put(`${controllerName}/ChangeHospitalStatus/${id}`, data);
  }

  deleteHospital(id: number): Observable<HospitalSingleResponseView> {
    return this.apiService.delete(`${controllerName}/${id}`);
  }

  getHospitalList(active: boolean = true): Observable<HospitalResponseView> {
    return this.apiService.get(`${controllerName}/HospitalList/${active}`);
  }

  getHospitalTableList(queryParams?: FilterParamList): Observable<HospitalPaginatedResponseView> {
    return this.apiService.get(controllerName, queryParams);
  }

  getSingleHospital(id: number): Observable<HospitalSingleResponseView> {
    return this.apiService.get(`${controllerName}/${id}`);
  }
}
