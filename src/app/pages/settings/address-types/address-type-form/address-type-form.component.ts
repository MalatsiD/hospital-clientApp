import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressTypeView } from './../../../../shared/interfaces/addressTypeView';
import { Component, OnInit } from '@angular/core';
import { AddressTypeService } from 'src/app/services/address-type.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/shared/services/data.service';
import { AddressTypeDto } from 'src/app/shared/dtos/address-type-dto';

@Component({
  selector: 'app-address-type-form',
  templateUrl: './address-type-form.component.html',
  styleUrls: ['./address-type-form.component.scss'],
  providers: [MessageService]
})
export class AddressTypeFormComponent implements OnInit {
  selectedAddressType = {} as AddressTypeView;
  addressTypeEditId: number = 0;
  addressTypeForm = {} as FormGroup;

  isLoading: boolean = false;

  constructor(
    private config: DynamicDialogConfig,
    private addressTypeService: AddressTypeService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.loadCityDetails();
  }

  loadForm(): void {
    this.addressTypeForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      active: ['']
    });
  }

  loadCityDetails(): void {
    if(this.config.data.id) {
      this.isLoading = true;
      this.addressTypeService.getSingleAddressType(this.config.data.id).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.selectedAddressType = result.response;
            this.addressTypeEditId = this.config.data.id;
            this.patchFormValues(this.selectedAddressType);
            this.isLoading = false;
          }
        }
      })
    }
  }

  patchFormValues(addressType: AddressTypeView): void {
    this.addressTypeForm.patchValue({
      id: addressType.id,
      name: addressType.name,
      description: addressType.description,
      active: addressType.active
    });
  }

  submitData(): void {
    this.messageService.clear();
    let city: AddressTypeDto = this.addressTypeForm.value;
    this.isLoading = true;

    if(this.addressTypeEditId > 0) {
      this.addressTypeService.updateAddressType(city, this.addressTypeEditId).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.isLoading = false;
            this.messageService.add({severity:'success', summary:'Successfully', detail:`updated ${result.response.name}`});
            this.dataService.updateAddressTypeSingleData(result.response);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.messageService.add({severity:'error', summary:'Error', detail: err});
        }
      })
    } else {
      city.active = true;
      this.addressTypeService.addAddressType(city).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.isLoading = false;
            this.messageService.add({severity:'success', summary:'Successfully', detail:`added ${result.response.name}`});
            this.dataService.updateAddressTypeSingleData(result.response);
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
