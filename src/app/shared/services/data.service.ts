import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CountryView } from '../interfaces/countryView';
import { ProvinceView } from '../interfaces/provinceView';
import { CityView } from '../interfaces/cityView';
import { AddressTypeView } from '../interfaces/addressTypeView';
import { HospitalView } from '../interfaces/hospitalView';
import { AilmentView } from '../interfaces/ailmentView';
import { RoleView } from '../interfaces/roleView';
import { GenderView } from '../interfaces/genderView';
import { TitleView } from '../interfaces/titleView';

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

  hospital: HospitalView = {} as HospitalView;
  private hospitalSingleData = new BehaviorSubject<HospitalView>(this.hospital);

  ailment: AilmentView = {} as AilmentView;
  private ailmentSingleData = new BehaviorSubject<AilmentView>(this.ailment);

  role: RoleView = {} as RoleView;
  private roleSingleData = new BehaviorSubject<RoleView>(this.role);

  gender: GenderView = {} as GenderView;
  private genderSingleData = new BehaviorSubject<GenderView>(this.gender);

  title: TitleView = {} as TitleView;
  private titleSingleData = new BehaviorSubject<TitleView>(this.title);

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

  updateHospitalSingleData(data: HospitalView): void {
    this.hospitalSingleData.next(data);
  }

  getHospitalSingleData(): Observable<HospitalView> {
    return this.hospitalSingleData.asObservable();
  }

  updateAilmentSingleData(data: AilmentView): void {
    this.ailmentSingleData.next(data);
  }

  getAilmentSingleData(): Observable<AilmentView> {
    return this.ailmentSingleData.asObservable();
  }

  updateRoleSingleData(data: RoleView): void {
    this.roleSingleData.next(data);
  }

  getRoleSingleData(): Observable<RoleView> {
    return this.roleSingleData.asObservable();
  }

  updateGenderSingleData(data: GenderView): void {
    this.genderSingleData.next(data);
  }

  getGenderSingleData(): Observable<GenderView> {
    return this.genderSingleData.asObservable();
  }

  updateTitleSingleData(data: TitleView): void {
    this.titleSingleData.next(data);
  }

  getTitleSingleData(): Observable<TitleView> {
    return this.titleSingleData.asObservable();
  }
  
}
