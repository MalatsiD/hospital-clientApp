import { DataService } from './../../../../shared/services/data.service';
import { ProvinceView } from './../../../../shared/interfaces/provinceView';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProvinceService } from 'src/app/services/province.service';
import { CountryView, CountryViewList } from 'src/app/shared/interfaces/countryView';
import { CountryService } from 'src/app/services/country.service';
import { ProvinceDto } from 'src/app/shared/dtos/province-dto';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';


@Component({
  selector: 'app-province-form',
  templateUrl: './province-form.component.html',
  styleUrls: ['./province-form.component.scss'],
  providers: [MessageService]
})
export class ProvinceFormComponent implements OnInit, OnDestroy {

  selectedProvince = {} as ProvinceView;
  selectedCountry = {} as CountryView;
  countryList: CountryViewList = [];
  provinceEditId: number = 0;
  provinceForm = {} as FormGroup;

  isLoading: boolean = false;

  constructor(
    private config: DynamicDialogConfig,
    private provinceService: ProvinceService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private dataService: DataService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.loadCountries();
    this.loadProvinceDetails();
  }

  loadForm(): void {
    this.provinceForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      code: ['', Validators.required],
      countryId: ['', Validators.required],
      description: [''],
      active: ['']
    });
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
    })
  }

  loadProvinceDetails(): void {
    if(this.config.data.id) {
      this.isLoading = true;
      this.provinceService.getSingleProvince(this.config.data.id).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.selectedProvince = result.response;
            this.provinceEditId = this.config.data.id;
            this.patchFormValues(this.selectedProvince);
            this.isLoading = false;
          }
        }
      })
    }
  }

  patchFormValues(province: ProvinceView): void {
    this.provinceForm.patchValue({
      id: province.id,
      name: province.name,
      code: province.code,
      countryId: province.countryId,
      description: province.description,
      active: province.active
    });
  }

  submitData(): void {
    this.messageService.clear();
    let province: ProvinceDto = this.provinceForm.value;
    this.isLoading = true;

    if(this.provinceEditId > 0) {
      this.provinceService.updateProvince(province, this.provinceEditId).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.messageService.add({severity:'success', summary:'Successfully', detail:`updated ${result.response.name}`});
            this.dataService.updateProvinceSingleData(result.response);
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
      province.active = true;
      this.provinceService.addProvince(province).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.messageService.add({severity:'success', summary:'Successfully', detail:`added ${result.response.name}`});
            this.dataService.updateProvinceSingleData(result.response);
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

  ngOnDestroy(): void {
  }
}
