import { DataService } from './../../../../shared/services/data.service';
import { SharedService } from './../../../../shared/services/shared.service';
import { CountryView } from 'src/app/shared/interfaces/countryView';
import { CountryService } from 'src/app/services/country.service';
import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryDto } from 'src/app/shared/dtos/country-dto';
import { result } from 'lodash';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss'],
  providers: [MessageService]
})
export class CountryFormComponent implements OnInit {
  
  selectedCountry = {} as CountryView;
  countryEditId: number = 0;
  countryForm = {} as FormGroup;

  isLoading: boolean = false;

  constructor(
    private config: DynamicDialogConfig,
    private counrtyService: CountryService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    this.loadForm();
    this.loadCountryDetails();
  }

  loadCountryDetails(): void {
    if(this.config.data.id) {
      this.isLoading = true;
      this.counrtyService.getSingleCountry(this.config.data.id).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.selectedCountry = result.response;
            this.countryEditId = this.config.data.id;
            this.patchFormValues(this.selectedCountry);
            this.isLoading = false;
          }
        }
      })
    }
  }

  loadForm(): void {
    this.countryForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: [''],
      active: ['']
    });
  }

  patchFormValues(country: CountryView): void {
    this.countryForm.patchValue({
      id: country.id,
      name: country.name,
      code: country.code,
      description: country.description,
      active: country.active
    });
  }

  submitData(): void {
    this.messageService.clear();
    let country: CountryDto = this.countryForm.value;
    this.isLoading = true;

    if(this.countryEditId > 0) {
      this.counrtyService.updateCountry(country, this.countryEditId).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.isLoading = false;
            this.messageService.add({severity:'success', summary:'Successfully', detail:`updated ${result.response.name}`});
            this.dataService.updateCountrySingleData(result.response);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.messageService.add({severity:'error', summary:'Error', detail: err});
        }
      })
    } else {
      country.active = true;
      this.counrtyService.addCountry(country).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.isLoading = false;
            this.messageService.add({severity:'success', summary:'Successfully', detail:`added ${result.response.name}`});
            this.dataService.updateCountrySingleData(result.response);
            this.loadForm();
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err)
          this.messageService.add({severity:'error', summary:'Error', detail: err});
        }
      });
    }
  }

}
