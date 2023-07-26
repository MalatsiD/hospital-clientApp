import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessagesModule } from 'primeng/messages';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { BasicViewSkeletonComponent } from './skeletons/basic-view-skeleton/basic-view-skeleton.component';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    BasicViewSkeletonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    TagModule,
    MessageModule,
    PaginatorModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    InputTextareaModule,
    ProgressBarModule,
    MessagesModule,
    SkeletonModule,
    CardModule,
    DropdownModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    BasicViewSkeletonComponent,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    TagModule,
    MessageModule,
    PaginatorModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    InputTextareaModule,
    ProgressBarModule,
    MessagesModule,
    SkeletonModule,
    CardModule,
    DropdownModule
  ],
  providers: [
  ]
})
export class SharedModule { }
