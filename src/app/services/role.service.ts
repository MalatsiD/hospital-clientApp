import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { RoleDto } from '../shared/dtos/role-dto';
import { RolePaginatedResponseView, RoleResponseView, RoleSingleResponseView } from '../shared/interfaces/roleView';
import { Observable } from 'rxjs';
import { StatusChange } from '../shared/interfaces/status-change';
import { FilterParamList } from '../shared/interfaces/filter-params';

const controllerName = 'Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private apiService: ApiService) { }

  addRole(data: RoleDto): Observable<RoleSingleResponseView> {
    return this.apiService.post(controllerName, data);
  }

  updateRole(data: RoleDto, id: number): Observable<RoleSingleResponseView> {
    return this.apiService.put(`${controllerName}/${id}`, data);
  }

  changeRoleStatus(data: StatusChange, id: number): Observable<RoleSingleResponseView> {
    return this.apiService.put(`${controllerName}/ChangeRoleStatus/${id}`, data);
  }

  deleteRole(id:number): Observable<RoleSingleResponseView> {
    return this.apiService.delete(`${controllerName}/${id}`);
  }

  getSingleRole(id: number): Observable<RoleSingleResponseView> {
    return this.apiService.get(`${controllerName}/${id}`);
  }

  getRolesList(id: number = 0, active: boolean = true): Observable<RoleResponseView> {
    return this.apiService.get(`${controllerName}/RoleList/${id}/${active}`);
  }

  getRolesTableList(queryParams?: FilterParamList): Observable<RolePaginatedResponseView> {
    return this.apiService.get(controllerName, queryParams);
  }
}
