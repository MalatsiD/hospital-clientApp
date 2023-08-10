import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { TitleFormComponent } from '../title-form/title-form.component';

@Component({
  selector: 'app-title-form-container',
  template: '',
  styleUrls: ['./title-form-container.component.scss'],
  providers: [DialogService]
})
export class TitleFormContainerComponent implements OnInit, OnDestroy {
  
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
              this.ref = this.dialogService.open(TitleFormComponent, {
                  header: params['id'] ? 'Edit Title' : 'Add Title',
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
                  this.router.navigate(['settings/titles', {outlets: {modal: null}}]);
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
