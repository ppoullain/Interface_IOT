export enum Connection_Type {
	Bluetooth = 1,
	Wifi = 2,
	Other = 0
}
export class Device {

  address_mac: string;
  name: string;
  type: Connection_Type;
  connected: boolean;
}