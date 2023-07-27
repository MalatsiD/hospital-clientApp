import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AddressTypeFormComponent } from '../address-type-form/address-type-form.component';

@Component({
  selector: 'app-address-type-form-container',
  template: '',
  providers: [DialogService]
})
export class AddressTypeFormContainerComponent implements OnInit, OnDestroy {
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
                this.ref = this.dialogService.open(AddressTypeFormComponent, {
                    header: params['id'] ? 'Edit Address Type' : 'Add Address Type',
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
                    this.router.navigate(['settings/address-types', {outlets: {modal: null}}]);
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
