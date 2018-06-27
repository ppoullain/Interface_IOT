import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListDevicesComponent } from './list-devices/list-devices.component';
import { BezierComponent } from './bezier/bezier.component';
import { InfoCommandesComponent } from './info-commandes/info-commandes.component';
import { SvgCanvasComponent } from './svg-canvas/svg-canvas.component';


@NgModule({
  declarations: [
    AppComponent,
    ListDevicesComponent,
    BezierComponent,
    InfoCommandesComponent,
    SvgCanvasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
