import { Device, Connection_Type } from './device';

export const DEVICES: Device[] = [
  { address_mac: '5E:FF:56:A2:AF:15', name: 'Robot Dessinateur', type:Connection_Type.Bluetooth, connected:true, img_src:"../assets/bluetooth.svg" },
  { address_mac: 'AC:24:B5:C1:39:52', name: 'Object 2 wifi', type:Connection_Type.Wifi, connected:false, img_src:"../assets/wifi.svg" },
];
