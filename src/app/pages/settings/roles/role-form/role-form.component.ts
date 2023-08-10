import { RoleService } from 'src/app/services/role.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleView } from './../../../../shared/interfaces/roleView';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';
import { MessageService } from 'primeng/api';
import { RoleDto } from 'src/app/shared/dtos/role-dto';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  selectedRole = {} as RoleView;
  roleEditId: number = 0;
  roleForm = {} as FormGroup;

  isLoading: boolean = false;
  
  constructor(
    private config: DynamicDialogConfig,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.loadRoleDetails();
  }

  loadForm(): void {
    this.roleForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      active: ['']
    });
  }

  loadRoleDetails(): void {
    if(this.config.data.id) {
      this.isLoading = true;
      this.roleService.getSingleRole(this.config.data.id).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.selectedRole = result.response;
            this.roleEditId = this.config.data.id;
            this.patchFormValues(this.selectedRole);
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

  patchFormValues(role: RoleView): void {
    this.roleForm.patchValue({
      id: role.id,
      name: role.name,
      description: role.description,
      active: role.active
    });
  }

  submitData(): void {
    this.messageService.clear();
    let role: RoleDto = this.roleForm.value;
    this.isLoading = true;

    if(this.roleEditId > 0) {
      this.roleService.updateRole(role, this.roleEditId).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.messageService.add({severity:'success', summary:'Successfully', detail:`updated ${result.response.name}`});
            this.dataService.updateRoleSingleData(result.response);
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
      role.active = true;
      this.roleService.addRole(role).subscribe({
        next: (result) => {
          if(result.isSuccessful) {
            this.messageService.add({severity:'success', summary:'Successfully', detail:`added ${result.response.name}`});
            this.dataService.updateRoleSingleData(result.response);
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
