// import { NgModule } from '@angular/core';
import { NgModule } from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadocomponentComponent } from './empleadocomponent/empleadocomponent.component';
import { FormsModule } from "@angular/forms";
//Camara
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import {CamaraComponent} from '../components/camara/camara.component';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
    EmpleadocomponentComponent,
    CamaraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    WebcamModule
  ],
  exports: [EmpleadocomponentComponent]
})
export class EmpleadoModule { }
