import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CleanUrlSerializer } from './clean-url-serializer';
import { UrlSerializer } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    MessageService, 
    ConfirmationService,
    // {provide: UrlSerializer, useClass: CleanUrlSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
