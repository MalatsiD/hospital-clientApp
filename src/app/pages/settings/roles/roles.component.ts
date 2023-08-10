import { StatusChange } from './../../../shared/interfaces/status-change';
import { FilterParamList } from 'src/app/shared/interfaces/filter-params';
import { RoleView, RoleViewList } from './../../../shared/interfaces/roleView';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { RoleService } from 'src/app/services/role.service';
import { DataService } from 'src/app/shared/services/data.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  tableIsLoading: boolean = false;
  rolesList: RoleViewList = [];

  paginationValues: number[] = [];
  filterParams: FilterParamList = [];

  confirmDialogHeader: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  inputSearch: string = '';
  inputChangeHasLoaded: boolean = true;

  roleListSubscription = new Subscription();

  fakeData: any[] = [];
  fakeColumns: string[] = [];

  constructor(
    private roleService: RoleService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadSkeleton();
    this.loadRoles();
    this.detectCityDataChanges();
    this.paginationValues = this.sharedService.getTablePaginatorValues();
  }

  loadSkeleton(): void {
    this.fakeData = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    this.fakeColumns = ['Name', 'Description', 'Status', ''];
  }

  refreshData(): void {
    this.isLoading = true;
    this.loadRoles();
  }

  detectCityDataChanges(): void {
    this.roleListSubscription = this.dataService.getRoleSingleData().subscribe({
      next: (result) => {
        if (result) {
          this.loadRoles();
        }
      }
    });
  }

  loadRoles() : void {
    this.loadParams();
    this.roleService.getRolesTableList(this.filterParams).subscribe({
      next: (result) => {
        if(result.isSuccessful) {
          this.totalRecords = result.totalRecords;
          this.rolesList = result.response;
        }

        this.isLoading = false;
        this.tableIsLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.tableIsLoading = false;
        const errorResult = err.error as ApiResponse;
        this.sharedService.showErrorMessage(errorResult.errorMessage);
      }
    });
  }

  goToAddRole(): void {
    this.router.navigate(['settings/roles', {outlets: {modal: 'form/new'}}]);
  }

  getStatusClass(status: boolean): string {
    return status ? 'success' : 'danger';
  }

  changeRoleStatus(role: RoleView): void {
    const statusChange: StatusChange = { active: !role.active };
    this.confirmDialogHeader = 'Status Change';

    this.confirmationService.confirm({
      message: `You want to ${role.active ? 'Deactivate' : 'Activate'} ${role.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.roleService.changeRoleStatus(statusChange, role.id).subscribe({
          next: (result) => {
            this.roleChangesResponse(role.name, result.isSuccessful, result.errorMessage, 'successfully updated');
          },
          error: (err) => {
            const errorResult = err.error as ApiResponse;
            this.sharedService.showErrorMessage(errorResult.errorMessage);
          }
        });
      }
    });
  }

  roleChangesResponse(name: string, isSuccessful: boolean, errorMessage: string, msg: string): void {
    if(isSuccessful) {
      this.sharedService.showSuccessMessage(`${name} ${msg}!`);
      this.tableIsLoading = true;
      this.loadRoles();
    } else {
      this.sharedService.showErrorMessage(errorMessage);
    }
  }

  goToEditRole(role: RoleView): void {
    this.router.navigate(['settings/roles', {outlets: {modal: 'form/edit/' + role.id}}]);
  }

  deleteRole(role: RoleView): void {
    this.confirmDialogHeader = 'Delete'; 

    this.confirmationService.confirm({
      message: `You want to delete ${role.name}?`,
      icon: 'fa fa-triangle-exclamation',
      accept: () => {
        this.roleService.deleteRole(role.id).subscribe({
          next: (result) => {
            this.roleChangesResponse(role.name, result.isSuccessful, result.errorMessage, 'successfully deleted');
          },
          error: (err) => {
            const errorResult = err.error as ApiResponse;
            this.sharedService.showErrorMessage(errorResult.errorMessage);
          }
        })
      }
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.pageSize = event.rows;

    this.tableIsLoading = true;
    this.loadRoles();
  }

  searchData(event: any): void {
    if(event.target.value?.length >= 3) {
      this.inputSearch = event.target.value;
      this.inputChangeHasLoaded = false;

      this.tableIsLoading = true;
      this.loadRoles();
    } else {
      if (!this.inputChangeHasLoaded) {
        this.inputSearch = '';
        this.inputChangeHasLoaded = true;

        this.tableIsLoading = true;
        this.loadRoles();
      }
    }
  }

  loadParams(): void {
    this.filterParams = [];
    if (this.inputSearch != '' && this.inputSearch != null) {
      this.filterParams.push(
        { paramName: 'Name', paramValue: this.inputSearch}
      );
    }
    this.filterParams.push(
      { paramName: 'CurrentPage', paramValue: this.currentPage},
      { paramName: 'PageSize', paramValue: this.pageSize}
    );
  }

  ngOnDestroy(): void {
    this.roleListSubscription.unsubscribe();
  }

}
