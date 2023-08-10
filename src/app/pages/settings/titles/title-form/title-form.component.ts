import { DataService } from 'src/app/shared/services/data.service';
import { TitleService } from './../../../../services/title.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TitleView } from './../../../../shared/interfaces/titleView';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { TitleDto } from 'src/app/shared/dtos/title-dto';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

@Component({
  selector: 'app-title-form',
  templateUrl: './title-form.component.html',
  styleUrls: ['./title-form.component.scss']
})
export class TitleFormComponent  implements OnInit {

  selectedTitle = {} as TitleView;
  titleEditId: number = 0;
  titleForm = {} as FormGroup;

  isLoading: boolean = false;
  
  constructor(
    private config: DynamicDialogConfig,
    private titleService: TitleService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.loadTitleDetails();
  }

  loadForm(): void {
    this.titleForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      active: ['']
    });
  }

  loadTitleDetails(): void {
    if(this.config.data.id) {
      this.isLoading = true;
      this.titleService.getSingleTitle(this.config.data.id).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.selectedTitle = result.response;
            this.titleEditId = this.config.data.id;
            this.patchFormValues(this.selectedTitle);
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.isLoading = false;
          const errorResult = err.error as ApiResponse;
          this.messageService.add({severity:'error', summary:'Error', detail: errorResult.errorMessage});
        }
      });
    }
  }

  patchFormValues(title: TitleView): void {
    this.titleForm.patchValue({
      id: title.id,
      name: title.name,
      description: title.description,
      active: title.active
    });
  }

  submitData(): void {
    this.messageService.clear();
    let title: TitleDto = this.titleForm.value;
    this.isLoading = true;

    if(this.titleEditId > 0) {
      this.titleService.updateTitle(title, this.titleEditId).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.isLoading = false;
            this.messageService.add({severity:'success', summary:'Successfully', detail:`updated ${result.response.name}`});
            this.dataService.updateTitleSingleData(result.response);
          }
        },
        error: (err) => {
          this.isLoading = false;
          const errorResult = err.error as ApiResponse;
          this.messageService.add({severity:'error', summary:'Error', detail: errorResult.errorMessage});
        }
      })
    } else {
      title.active = true;
      this.titleService.addTitle(title).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.isLoading = false;
            this.messageService.add({severity:'success', summary:'Successfully', detail:`added ${result.response.name}`});
            this.dataService.updateTitleSingleData(result.response);
            this.loadForm();
          }
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
