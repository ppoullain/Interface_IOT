import { Input, Component, OnInit } from '@angular/core';
import { Device } from './device';
import { DeviceService} from './device.service';


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  
  @Input() device:Device;
  
  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
  }
  
  
}
