import { AilmentDto } from './../../../../shared/dtos/ailment-dto';
import { AilmentView } from './../../../../shared/interfaces/ailmentView';
import { DataService } from 'src/app/shared/services/data.service';
import { AilmentService } from './../../../../services/ailment.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

@Component({
  selector: 'app-ailment-form',
  templateUrl: './ailment-form.component.html',
  styleUrls: ['./ailment-form.component.scss']
})
export class AilmentFormComponent implements OnInit {
  selectedAilment = {} as AilmentView;
  ailmentEditId: number = 0;
  ailmentForm = {} as FormGroup;

  isLoading: boolean = false;
  
  constructor(
    private config: DynamicDialogConfig,
    private ailmentService: AilmentService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.loadAilmentDetails();
  }

  loadForm(): void {
    this.ailmentForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      active: ['']
    });
  }

  loadAilmentDetails(): void {
    if(this.config.data.id) {
      this.isLoading = true;
      this.ailmentService.getSingleAilment(this.config.data.id).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.selectedAilment = result.response;
            this.ailmentEditId = this.config.data.id;
            this.patchFormValues(this.selectedAilment);
            this.isLoading = false;
          }
        }
      });
    }
  }

  patchFormValues(ailment: AilmentView): void {
    this.ailmentForm.patchValue({
      id: ailment.id,
      name: ailment.name,
      description: ailment.description,
      active: ailment.active
    });
  }

  submitData(): void {
    this.messageService.clear();
    let ailment: AilmentDto = this.ailmentForm.value;
    this.isLoading = true;

    if(this.ailmentEditId > 0) {
      this.ailmentService.updateAilment(ailment, this.ailmentEditId).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.messageService.add({severity:'success', summary:'Successfully', detail:`updated ${result.response.name}`});
            this.dataService.updateAilmentSingleData(result.response);
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
      ailment.active = true;
      this.ailmentService.addAilment(ailment).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.messageService.add({severity:'success', summary:'Successfully', detail:`added ${result.response.name}`});
            this.dataService.updateAilmentSingleData(result.response);
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
