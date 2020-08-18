import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { defineCustomElements, applyPolyfills } from '@tdp/st-components-mat/dist/loader';

import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  LogLevel,
  TDPAnalyticsModule,
  TDPAuthenticationModule, 
  TDPDirectivesModule,
  TDPLoggerModule,
  TDPStorageModule
} from '@tdp/ng-commons';

import { environment } from '../environments/environment';
import { LayoutComponent } from './layout/layout.component';
import { LoaderModule } from './commons/components/loader/loader.module';
import { MenuModule } from './commons/components/menu/menu.module';
import { LayoutModule } from './layout/layout.module';
import { DemoMaterialModule } from './commons/modules/material-module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';  

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core'; 
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
  
  
 @NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    ],
 

  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    TDPLoggerModule.forRoot({level: [LogLevel.DEBUG]}),
    TDPStorageModule.forRoot(),
    TDPAuthenticationModule.forRoot(),
    TDPAnalyticsModule.forRoot(environment.googleAnalyticsCode),
 
    LayoutModule,
    LoaderModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule, 
    Ng2SearchPipeModule,
    NgxPaginationModule,
    HttpClientModule  
   ],
  providers: [
    {  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

applyPolyfills().then(() => {
  defineCustomElements(window);
});


platformBrowserDynamic().bootstrapModule(AppModule);