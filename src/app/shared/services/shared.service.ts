import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FilterParamList } from '../interfaces/filter-params';
import { HttpParams } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private dataService: DataService
    ) { }

  showSuccessMessage(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showErrorMessage(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showInformationMessage(message: string): void {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }

  getTablePaginatorValues(): Array<number> {
    return [10, 25, 50, 75, 100];
  }

  setParams(paramsList: FilterParamList): HttpParams {
    let params = new HttpParams();

    for(let i = 0; i < paramsList?.length; i++) {
      params = params.set(paramsList[i].paramName, paramsList[i].paramValue);
    }

    return params;
  }
}
