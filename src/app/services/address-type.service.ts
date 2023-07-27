import { Observable } from 'rxjs';
import { AddressTypeDto } from '../shared/dtos/address-type-dto';
import { AddressTypePaginatedResponseView, AddressTypeResponseView, AddressTypeSingleResponseView } from '../shared/interfaces/addressTypeView';
import { ApiService } from './../shared/services/api.service';
import { Injectable } from '@angular/core';
import { StatusChange } from '../shared/interfaces/status-change';
import { FilterParamList } from '../shared/interfaces/filter-params';

const controllerName = 'AddressType';

@Injectable({
  providedIn: 'root'
})
export class AddressTypeService {

  constructor(private apiService: ApiService) { }

  addAddressType(data: AddressTypeDto): Observable<AddressTypeSingleResponseView> {
    return this.apiService.post(controllerName, data);
  }

  updateAddressType(data: AddressTypeDto, id: number): Observable<AddressTypeSingleResponseView> {
    return this.apiService.put(`${controllerName}/${id}`, data);
  }

  changeAddressTypeStatus(data: StatusChange, id: number): Observable<AddressTypeSingleResponseView> {
    return this.apiService.put(`${controllerName}/ChangeAddressTypeStatus/${id}`, data);
  }

  deleteAddressType(id:number): Observable<AddressTypeSingleResponseView> {
    return this.apiService.delete(`${controllerName}/${id}`);
  }

  getSingleAddressType(id: number): Observable<AddressTypeSingleResponseView> {
    return this.apiService.get(`${controllerName}/${id}`);
  }

  getAddressTypesList(active: boolean = true): Observable<AddressTypeResponseView> {
    return this.apiService.get(`${controllerName}/CityList/${active}`);
  }

  getAddressTypesTableList(queryParams?: FilterParamList): Observable<AddressTypePaginatedResponseView> {
    return this.apiService.get(controllerName, queryParams);
  }
}
