import { Component, OnInit } from '@angular/core';
import { DEVICES } from './mock-devices';
import { Device, Connection_Type } from './device';

@Component({
  selector: 'app-list-devices',
  templateUrl: './list-devices.component.html',
  styleUrls: ['./list-devices.component.css']
})
export class ListDevicesComponent implements OnInit {
	devices = DEVICES;
	selectedDevice: Device;
  	constructor() { }

  	ngOnInit() {
  	}
  onSelect(device: Device): void {
    this.selectedDevice = device;
  }
}
