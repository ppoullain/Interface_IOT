import { Injectable } from '@angular/core';
import { Device, Connection_Type, Connection} from './device';

@Injectable()
export class DeviceService {
  devices:Device[] = [
	  { 
      id:0, 
      mac_address: '5E:FF:56:A2:AF:15', 
      name: 'Robot Dessinateur', 
      connection : {
        type:Connection_Type.Bluetooth, 
        connected:false, 
        img:"../../assets/bluetooth_disconnected.svg" 
      }
    },
	  { 
      id:1, 
      mac_address: 'AC:24:B5:C1:39:52', 
      name: 'Object 2 wifi', 
      connection : {
        type:Connection_Type.Wifi, 
        connected:false, 
        img:"../../assets/wifi_disconnected.svg" 
      }
    },
  ];
  constructor() { } 


  connection(id:number){
    console.log(this.devices[id].connection.connected);
  	this.devices[id].connection.connected= true;
  	if(this.devices[id].connection.type == Connection_Type.Bluetooth){
  		this.devices[id].connection.img = "../../assets/bluetooth_connected.svg";
  	}else if(this.devices[id].connection.type == Connection_Type.Wifi){
  		this.devices[id].connection.img = "../../assets/wifi_connected.svg";
  	}
  }
 
  disconnection(id:number){
    this.devices[id].connection.connected = false;
  	if(this.devices[id].connection.type == Connection_Type.Bluetooth){
  		this.devices[id].connection.img = "../../assets/bluetooth_disconnected.svg";
  	}else if(this.devices[id].connection.type == Connection_Type.Wifi){
  		this.devices[id].connection.img = "../../assets/wifi_disconnected.svg";
  	}
  }

}
 