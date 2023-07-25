import { MessagesModule } from 'primeng/messages';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    TagModule,
    MessageModule,
    PaginatorModule,
    ConfirmDialogModule
  ],
  exports: [
    ButtonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    TagModule,
    MessageModule,
    PaginatorModule,
    ConfirmDialogModule
  ],
  providers: [
  ]
})
export class SharedModule { }
