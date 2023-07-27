import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CountryView } from '../interfaces/countryView';
import { ProvinceView } from '../interfaces/provinceView';
import { CityView } from '../interfaces/cityView';
import { AddressTypeView } from '../interfaces/addressTypeView';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  country: CountryView = {} as CountryView;
  private countrySingleData = new BehaviorSubject<CountryView>(this.country);

  province: ProvinceView = {} as ProvinceView;
  private provinceSingleData = new BehaviorSubject<ProvinceView>(this.province);

  city: CityView = {} as CityView;
  private citySingleData = new BehaviorSubject<CityView>(this.city);

  addressType: AddressTypeView = {} as CityView;
  private addressTypeingleData = new BehaviorSubject<AddressTypeView>(this.addressType);

  constructor() { }

  updateCountrySingleData(data: CountryView): void {
    this.countrySingleData.next(data);
  }

  getCountrySingleData(): Observable<CountryView> {
    return this.countrySingleData.asObservable();
  }

  updateProvinceSingleData(data: ProvinceView): void {
    this.provinceSingleData.next(data);
  }

  getProvinceSingleData(): Observable<ProvinceView> {
    return this.provinceSingleData.asObservable();
  }

  updateCitySingleData(data: CityView): void {
    this.citySingleData.next(data);
  }

  getCitySingleData(): Observable<CityView> {
    return this.citySingleData.asObservable();
  }

  updateAddressTypeSingleData(data: AddressTypeView): void {
    this.addressTypeingleData.next(data);
  }

  getAddressTypeSingleData(): Observable<AddressTypeView> {
    return this.addressTypeingleData.asObservable();
  }
}
