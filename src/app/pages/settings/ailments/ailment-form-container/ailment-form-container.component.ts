import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AilmentFormComponent } from '../ailment-form/ailment-form.component';

@Component({
  selector: 'app-ailment-form-container',
  template: '',
  styleUrls: ['./ailment-form-container.component.scss'],
  providers: [DialogService]
})
export class AilmentFormContainerComponent implements OnInit, OnDestroy {
  
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
              this.ref = this.dialogService.open(AilmentFormComponent, {
                  header: params['id'] ? 'Edit Ailment' : 'Add Ailment',
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
                  this.router.navigate(['settings/ailments', {outlets: {modal: null}}]);
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
