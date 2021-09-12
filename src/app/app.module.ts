import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { JploftComponent } from './jploft/jploft.component';
import {TableModule} from 'primeng/table';
import {SocketIoModule,SocketIoConfig,Socket} from 'ngx-socket-io';

import {ToastModule} from 'primeng/toast';

const config:SocketIoConfig={url:"http://localhost:3000",options:{transports:['websocket','polling']}};
@NgModule({
  declarations: [
    AppComponent,
    JploftComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule,
    ToastModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
