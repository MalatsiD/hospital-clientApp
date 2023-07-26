import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Subject, takeUntil } from "rxjs";
import { CountryFormComponent } from "../country-form/country-form.component";

@Component({
    selector: 'app-country-form-container',
    template: '',
    providers: [DialogService]
})
export class CountryFormContainer implements OnInit, OnDestroy {
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
                this.ref = this.dialogService.open(CountryFormComponent, {
                    header: params['id'] ? 'Edit Country' : 'Add Country',
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
                    this.router.navigate(['settings/countries', {outlets: {modal: null}}]);
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