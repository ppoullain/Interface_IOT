import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { ListDevicesComponent } from './list-devices/list-devices.component';
import { BezierComponent } from './bezier/bezier.component';
import { InfoCommandesComponent } from './info-commandes/info-commandes.component';
import { SvgCanvasComponent } from './svg-canvas/svg-canvas.component';
import { DeviceComponent } from './device/device.component';
import { DeviceService } from './device/device.service';
import { NgbdModalBasic } from './device/modal-device';


@NgModule({
  declarations: [
    AppComponent,
    ListDevicesComponent,
    BezierComponent,
    InfoCommandesComponent,
    SvgCanvasComponent,
    DeviceComponent,
    NgbdModalBasic
  ],
  entryComponents: [ 
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [ DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { } 
