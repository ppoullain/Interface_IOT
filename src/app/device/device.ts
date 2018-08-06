export enum Connection_Type {
	Bluetooth = 1,
	Wifi = 2,
	Other = 0
}
export class Connection {
	type:Connection_Type;
  	connected:boolean;
  	img:string;
}
export class Device{
  	id:number;
  	name:string;
  	mac_address:string;
  	connection : Connection;
}