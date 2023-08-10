import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { HospitalFormComponent } from '../hospital-form/hospital-form.component';

@Component({
  selector: 'app-hospital-form-conatiner',
  template: '',
  providers: [DialogService]
})
export class HospitalFormConatinerComponent {
  destroy = new Subject<any>();

  ref: DynamicDialogRef | undefined;

  constructor(
      private dialogService: DialogService, 
      private route: ActivatedRoute,
      private router: Router
      ) {
  }

  ngOnInit(): void {
      this.showDialog();
  }

  showDialog(): void {
      this.route.params.pipe(takeUntil(this.destroy)).subscribe({
          next: (params) => {
              this.ref = this.dialogService.open(HospitalFormComponent, {
                  header: params['id'] ? 'Edit Hospital' : 'Add Hospital',
                  width: '70%',
                  contentStyle: { overflow: 'auto' },
                  baseZIndex: 10000,
                  position: 'center',
                  closable: true,
                  data: {
                      id: params['id']
                  } 
              });
          }
      });

      if(this.ref) {
          this.ref.onClose.subscribe({
              next: () => {
                  this.router.navigate(['settings/hospitals', {outlets: {modal: null}}]);
              }
          })
      }
  }

  ngOnDestroy(): void {
      this.destroy.unsubscribe();
      if(this.ref) {
          this.ref.close();
      }
  }
}
