import { Component, OnInit } from '@angular/core';
import { Device } from '../device/device';
import { DeviceService} from '../device/device.service';

@Component({
  selector: 'app-list-devices',
  templateUrl: './list-devices.component.html',
  styleUrls: ['./list-devices.component.css']
})
export class ListDevicesComponent implements OnInit {
    devices:Device[] ;
    selectedDevice:Device;
    public isCollapsed = false;
  	constructor(private deviceService:DeviceService) { }

  	ngOnInit() {
  	}

    onScan(){
      this.devices = [];
      setTimeout(
        () => {
          this.devices = this.deviceService.devices;
        }, 1500
      );
    }

    listClick(event, newValue) {
      console.log(newValue);
      this.selectedDevice = newValue;  // don't forget to update the model here
     
    } 
}
