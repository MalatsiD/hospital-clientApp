import { CityDto } from './../../../../shared/dtos/city-dto';
import { CityService } from './../../../../services/city.service';
import { DataService } from './../../../../shared/services/data.service';
import { ProvinceView, ProvinceViewList } from './../../../../shared/interfaces/provinceView';
import { CityView, CityViewList } from './../../../../shared/interfaces/cityView';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProvinceService } from 'src/app/services/province.service';
import { MessageService } from 'primeng/api';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss'],
  providers: [MessageService]
})
export class CityFormComponent implements OnInit {

  selectedCity = {} as CityView;
  selectedProvince = {} as ProvinceView;
  provinceList: ProvinceViewList = [];
  cityEditId: number = 0;
  cityForm = {} as FormGroup;

  isLoading: boolean = false;
  
  constructor(
    private config: DynamicDialogConfig,
    private provinceService: ProvinceService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private dataService: DataService,
    private cityService: CityService
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.loadProvinces();
    this.loadCityDetails();
  }

  loadForm(): void {
    this.cityForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      provinceId: ['', Validators.required],
      description: [''],
      active: ['']
    });
  }

  loadProvinces(): void {
    this.provinceService.getProvincesList(0, true).subscribe({
      next: (result) => {
        if(result.isSuccessful) {
          this.provinceList = result.response;
        }
      },
      error: (err) => {
        const errorResult = err.error as ApiResponse;
        this.messageService.add({severity:'error', summary:'Error', detail: errorResult.errorMessage});
      }
    });
  }

  loadCityDetails(): void {
    if(this.config.data.id) {
      this.isLoading = true;
      this.cityService.getSingleCity(this.config.data.id).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.selectedCity = result.response;
            this.cityEditId = this.config.data.id;
            this.patchFormValues(this.selectedCity);
            this.isLoading = false;
          }
        }
      });
    }
  }

  patchFormValues(city: CityView): void {
    this.cityForm.patchValue({
      id: city.id,
      name: city.name,
      provinceId: city.provinceId,
      description: city.description,
      active: city.active
    });
  }

  submitData(): void {
    this.messageService.clear();
    let city: CityDto = this.cityForm.value;
    this.isLoading = true;

    if(this.cityEditId > 0) {
      this.cityService.updateCity(city, this.cityEditId).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.messageService.add({severity:'success', summary:'Successfully', detail:`updated ${result.response.name}`});
            this.dataService.updateCitySingleData(result.response);
          }

          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          const errorResult = err.error as ApiResponse;
          this.messageService.add({severity:'error', summary:'Error', detail: errorResult.errorMessage});
        }
      })
    } else {
      city.active = true;
      this.cityService.addCity(city).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.messageService.add({severity:'success', summary:'Successfully', detail:`added ${result.response.name}`});
            this.dataService.updateCitySingleData(result.response);
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
