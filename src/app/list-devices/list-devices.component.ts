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
}
