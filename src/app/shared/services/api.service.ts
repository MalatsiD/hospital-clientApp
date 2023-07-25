import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient, private sharedService: SharedService) { }

  post(url: string, body: any, queryParams?: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    
    const baseUrl = apiUrl + url;
    return this.http.post(baseUrl, body, {headers, params: queryParams});
  }

  put(url: string, body: any, queryParams?: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

    const baseUrl = apiUrl + url;
    return this.http.put(baseUrl, body, {headers, params: queryParams});
  }

  get(url: string, queryParams?: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    let params = this.sharedService.setParams(queryParams);
    const baseUrl = apiUrl + url;
    return this.http.get(baseUrl, {headers, params});
  }

  delete(url: string, queryParams?: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

    const baseUrl = apiUrl + url;
    return this.http.delete(baseUrl, {headers, params: queryParams});
  }

}
