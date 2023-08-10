import { CityControlListView } from './../../../../shared/interfaces/cityView';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HospitalView } from './../../../../shared/interfaces/hospitalView';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { HospitalService } from 'src/app/services/hospital.service';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/shared/services/data.service';
import { HospitalDto } from 'src/app/shared/dtos/hospital-dto';
import { AddressViewList } from 'src/app/shared/interfaces/addressView';
import { CountryService } from 'src/app/services/country.service';
import { ProvinceService } from 'src/app/services/province.service';
import { CityService } from 'src/app/services/city.service';
import { CountryViewList } from 'src/app/shared/interfaces/countryView';
import { ProvinceViewList } from 'src/app/shared/interfaces/provinceView';
import { AddressDto } from 'src/app/shared/dtos/address-dto';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

@Component({
  selector: 'app-hospital-form',
  templateUrl: './hospital-form.component.html',
  styleUrls: ['./hospital-form.component.scss']
})
export class HospitalFormComponent implements OnInit {
  selectedHospital = {} as HospitalView;
  hospitalEditId: number = 0;
  hospitalForm = {} as FormGroup;

  countryList: CountryViewList = [];
  provinceResidentialList: ProvinceViewList = [];
  provincePostalList: ProvinceViewList = [];
  cityResidentialList: CityControlListView = [];
  cityPostalList: CityControlListView = [];

  selectedCountry: number = 0;
  selectedProvince: number = 0;

  isLoading: boolean = false;

  constructor(
    private config: DynamicDialogConfig,
    private hospitalService: HospitalService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private dataService: DataService,
    private countryService: CountryService,
    private provinceService: ProvinceService,
    private cityService: CityService
    ) { }

    ngOnInit(): void {
      this.loadForm();
      this.loadHospitalDetails();
      this.loadCountries();
    }

    loadForm(): void {
      this.hospitalForm = this.formBuilder.group({
        id: [''],
        name: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        registrationNumber: ['', Validators.required],
        active: [''],
        residentialAddress: this.formBuilder.group({
          addressId: [''],
          addressDetail: ['', Validators.required],
          zipCode: ['', Validators.required],
          countryId: [''],
          provinceId: [''],
          cityId: ['', Validators.required],
          addressTypeId: ['1'],
          active: ['']
        }),
        postalAddress: this.formBuilder.group({
          addressId: [''],
          addressDetail: ['', Validators.required],
          zipCode: ['', Validators.required],
          countryId: [''],
          provinceId: [''],
          cityId: ['', Validators.required],
          addressTypeId: ['2'],
          active: [''],
          sameAddress: ['']
        })
      });

      this.hospitalForm.get('residentialAddress')?.get('countryId')?.valueChanges.subscribe({
        next: (value) => {
          if(value > 0) {
            this.loadProvinces(value, true);
          } else {
            this.provinceResidentialList = [];
          }
        }
      });

      this.hospitalForm.get('residentialAddress')?.get('provinceId')?.valueChanges.subscribe({
        next: (value) => {
          if(value > 0) {
            this.loadCities(value, true);
          } else {
            this.cityResidentialList = [];
          }
        }
      });

      this.hospitalForm.get('postalAddress')?.get('countryId')?.valueChanges.subscribe({
        next: (value) => {
          if(value > 0) {
            this.loadProvinces(value, false);
          } else {
            this.provincePostalList = [];
          }
        }
      });

      this.hospitalForm.get('postalAddress')?.get('provinceId')?.valueChanges.subscribe({
        next: (value) => {
          if(value > 0) {
            this.loadCities(value, false);
          } else {
            this.cityPostalList = [];
          }
        }
      });
    }
  
    loadHospitalDetails(): void {
      if(this.config.data.id) {
        this.isLoading = true;
        this.hospitalService.getSingleHospital(this.config.data.id).subscribe({
          next: (result) => {
            if(result.isSuccessful) {
              this.selectedHospital = result.response;
              this.hospitalEditId = this.config.data.id;
              this.patchFormValues(this.selectedHospital);
            }

            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            const errorResult = err.error as ApiResponse;
            this.messageService.add({severity:'error', summary:'Error', detail: errorResult.errorMessage});
          }
        });
      }
    }

    loadCountries(): void {
      this.countryService.getCountryList(true).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.countryList = result.response;
          }
        },
        error: (err) => {
          const errorResult = err.error as ApiResponse;
          this.messageService.add({severity:'error', summary:'Error', detail: errorResult.errorMessage});
        }
      });
    }

    loadProvinces(countryId: number, isResidential: boolean): void {
      this.provinceService.getProvincesList(countryId, true).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            if(isResidential) {
              this.provinceResidentialList = result.response;
            } else {
              this.provincePostalList = result.response;
            }
          }
        },
        error: (err) => {
          const errorResult = err.error as ApiResponse;
          this.messageService.add({severity:'error', summary:'Error', detail: errorResult.errorMessage});
        }
      });
    }

    loadCities(provinceId: number, isResidential: boolean): void {
      this.cityService.getCitiesList(provinceId, true).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            if(isResidential) {
              this.cityResidentialList = result.response;
            } else {
              this.cityPostalList = result.response;
            }
            
          }
        },
        error: (err) => {
          const errorResult = err.error as ApiResponse;
          this.messageService.add({severity:'error', summary:'Error', detail: errorResult.errorMessage});
        }
      });
    }

    sameAddressChange(event: any): void {
      if(event.target.checked) {
        const postalAddresId = this.hospitalForm.get('postalAddress')?.get('addressId')?.value;
        this.hospitalForm.patchValue({
          postalAddress: this.hospitalForm.get('residentialAddress')?.value
        });

        this.hospitalForm.get('postalAddress')?.get('addressId')?.setValue(postalAddresId);
        this.hospitalForm.get('postalAddress')?.get('addressTypeId')?.setValue(2);
      } else {
        this.hospitalForm.patchValue({
          postalAddress: {
            // addressId: [''],
            addressDetail: '',
            zipCode: '',
            countryId: '',
            provinceId: '',
            cityId: '',
            addressTypeId: '',
            active: ''
          }
        });
      }
    }

    compareAddresses(): void {
      if(this.selectedHospital?.addresses?.length > 1) {
        const firstAddress = this.selectedHospital.addresses[0];
        const address = this.selectedHospital.addresses.find(x => 
            x.addressId !== firstAddress.addressId &&
            x.addressDetail === firstAddress.addressDetail &&
            x.countryId === firstAddress.countryId &&
            x.provinceId === firstAddress.provinceId &&
            x.cityId === firstAddress.cityId &&
            x.zipCode === firstAddress.zipCode
          );

          if (address) {
            this.hospitalForm.get('postalAddress')?.get('sameAddress')?.setValue(true);
          }
      }
    }
  
    patchFormValues(hospital: HospitalView): void {
      const residentialAddress = hospital.addresses.find(x => x.addressTypeId === 1);
      const postalAddress = hospital.addresses.find(x => x.addressTypeId === 2);

      this.hospitalForm.patchValue({
        id: hospital.id,
        name: hospital.name,
        phoneNumber: hospital.phoneNumber,
        email: hospital.email,
        registrationNumber: hospital.registrationNumber,
        active: hospital.active,
        residentialAddress: residentialAddress,
        postalAddress: postalAddress
      });

      this.compareAddresses();
    }

    getAddressDtoValue(formName: string): AddressDto {
      const id = this.hospitalForm.get(formName)?.get('addressId')?.value ?
      this.hospitalForm.get(formName)?.get('addressId')?.value : 0;
      let address: AddressDto = {
        id,
        addressDetail: this.hospitalForm.get(formName)?.get('addressDetail')?.value,
        zipCode: this.hospitalForm.get(formName)?.get('zipCode')?.value,
        cityId: this.hospitalForm.get(formName)?.get('cityId')?.value,
        addressTypeId: this.hospitalForm.get(formName)?.get('addressTypeId')?.value,
        active: this.hospitalForm.get('active')?.value ? this.hospitalForm.get('active')?.value : true
      };

      return address;
    }

    assignHospitalOnSubmit(): HospitalDto {
      
      let hospital: HospitalDto  = {
        name: this.hospitalForm.get('name')?.value,
        phoneNumber: this.hospitalForm.get('phoneNumber')?.value,
        email: this.hospitalForm.get('email')?.value,
        registrationNumber: this.hospitalForm.get('registrationNumber')?.value,
        addresses: [
          this.getAddressDtoValue('residentialAddress'),
          this.getAddressDtoValue('postalAddress')
        ],
        active: this.hospitalForm.get('active')?.value
      };

      return hospital;
    }

    afterSubmitAssignIds(hospitalView: HospitalView): void {
      hospitalView.addresses.forEach(item => {
        const formName = item.addressTypeId === 1 ? 'residentialAddress' : 'postalAddress';
        this.hospitalForm.get(formName)?.get('addressId')?.setValue(item.addressId);
      });
    }

    submitData(): void {
      window.scroll({ top: 0, left: 0, behavior: 'smooth'});

      this.messageService.clear();
      let hospital: HospitalDto = this.assignHospitalOnSubmit();
      this.isLoading = true;
  
      if(this.hospitalEditId > 0) {
        this.hospitalService.updateHospital(hospital, this.hospitalEditId).subscribe({
          next: (result) => {
            if(result.isSuccessful) {
              this.messageService.add({severity:'success', summary:'Successfully', detail:`updated ${result.response.name}`});
              this.dataService.updateHospitalSingleData(result.response);
              this.afterSubmitAssignIds(result.response);
            }

            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            const errorResult = err.error as ApiResponse;
            this.messageService.add({severity:'error', summary:'Error', detail: errorResult.errorMessage});
          }
        });
      } else {
        console.log('Submit: ', hospital)
        hospital.active = true;
        this.hospitalService.addHospital(hospital).subscribe({
          next: (result) => {
            if(result.isSuccessful) {
              this.messageService.add({severity:'success', summary:'Successfully', detail:`added ${result.response.name}`});
              this.dataService.updateHospitalSingleData(result.response);
              
              this.loadForm();
            }

            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            const errorResult = err.error as ApiResponse;
            this.messageService.add({severity:'error', summary:'Error', detail: errorResult.errorMessage});
          }
        });
      }
    }
}
