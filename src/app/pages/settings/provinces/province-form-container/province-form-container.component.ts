import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProvinceFormComponent } from '../province-form/province-form.component';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-province-form-container',
  template: '',
  providers: [DialogService]
})
export class ProvinceFormContainerComponent {

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
                this.ref = this.dialogService.open(ProvinceFormComponent, {
                    header: params['id'] ? 'Edit Province' : 'Add Province',
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
                    this.router.navigate(['settings/provinces', {outlets: {modal: null}}]);
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
