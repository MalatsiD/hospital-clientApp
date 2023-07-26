import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { CityFormComponent } from '../city-form/city-form.component';

@Component({
  selector: 'app-city-form-container',
  template: '',
  providers: [DialogService]
})
export class CityFormContainerComponent {
  
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
                this.ref = this.dialogService.open(CityFormComponent, {
                    header: params['id'] ? 'Edit City' : 'Add City',
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
                    this.router.navigate(['settings/cities', {outlets: {modal: null}}]);
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
