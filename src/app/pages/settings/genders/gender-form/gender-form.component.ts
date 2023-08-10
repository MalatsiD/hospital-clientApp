import { GenderDto } from './../../../../shared/dtos/gender-dto';
import { DataService } from 'src/app/shared/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenderView } from './../../../../shared/interfaces/genderView';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { GenderService } from 'src/app/services/gender.service';
import { MessageService } from 'primeng/api';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

@Component({
  selector: 'app-gender-form',
  templateUrl: './gender-form.component.html',
  styleUrls: ['./gender-form.component.scss']
})
export class GenderFormComponent implements OnInit {

  selectedGender = {} as GenderView;
  genderEditId: number = 0;
  genderForm = {} as FormGroup;

  isLoading: boolean = false;
  
  constructor(
    private config: DynamicDialogConfig,
    private genderService: GenderService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.loadGenderDetails();
  }

  loadForm(): void {
    this.genderForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      active: ['']
    });
  }

  loadGenderDetails(): void {
    if(this.config.data.id) {
      this.isLoading = true;
      this.genderService.getSingleGender(this.config.data.id).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.selectedGender = result.response;
            this.genderEditId = this.config.data.id;
            this.patchFormValues(this.selectedGender);
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

  patchFormValues(gender: GenderView): void {
    this.genderForm.patchValue({
      id: gender.id,
      name: gender.name,
      description: gender.description,
      active: gender.active
    });
  }

  submitData(): void {
    this.messageService.clear();
    let gender: GenderDto = this.genderForm.value;
    this.isLoading = true;

    if(this.genderEditId > 0) {
      this.genderService.updateGender(gender, this.genderEditId).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.messageService.add({severity:'success', summary:'Successfully', detail:`updated ${result.response.name}`});
            this.dataService.updateGenderSingleData(result.response);
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
      gender.active = true;
      this.genderService.addGender(gender).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.messageService.add({severity:'success', summary:'Successfully', detail:`added ${result.response.name}`});
            this.dataService.updateGenderSingleData(result.response);
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
