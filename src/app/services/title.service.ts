import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { TitlePaginatedResponseView, TitleResponseView, TitleSingleResponseView } from '../shared/interfaces/titleView';
import { Observable } from 'rxjs';
import { TitleDto } from '../shared/dtos/title-dto';
import { StatusChange } from '../shared/interfaces/status-change';
import { FilterParamList } from '../shared/interfaces/filter-params';

const controllerName = 'Title';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private apiService: ApiService) { }

  addTitle(data: TitleDto): Observable<TitleSingleResponseView> {
    return this.apiService.post(controllerName, data);
  }

  updateTitle(data: TitleDto, id: number): Observable<TitleSingleResponseView> {
    return this.apiService.put(`${controllerName}/${id}`, data);
  }

  changeTitleStatus(data: StatusChange, id: number): Observable<TitleSingleResponseView> {
    return this.apiService.put(`${controllerName}/ChangeTitleStatus/${id}`, data);
  }

  deleteTitle(id:number): Observable<TitleSingleResponseView> {
    return this.apiService.delete(`${controllerName}/${id}`);
  }

  getSingleTitle(id: number): Observable<TitleSingleResponseView> {
    return this.apiService.get(`${controllerName}/${id}`);
  }

  getTitlesList(id: number = 0, active: boolean = true): Observable<TitleResponseView> {
    return this.apiService.get(`${controllerName}/TitleList/${id}/${active}`);
  }

  getTitlesTableList(queryParams?: FilterParamList): Observable<TitlePaginatedResponseView> {
    return this.apiService.get(controllerName, queryParams);
  }
  
}
