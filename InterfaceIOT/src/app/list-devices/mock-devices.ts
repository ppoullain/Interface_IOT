import { Device, Connection_Type } from './device';

export const DEVICES: Device[] = [
  { address_mac: '5E:FF:56:A2:AF:15', name: 'Robot Dessinateur', type:Connection_Type.Bluetooth, connected:true },
  { address_mac: 'A1:23:B4:18:DE:FF', name: 'Wifi device 1', type:Connection_Type.Wifi, connected:false },
  { address_mac: 'D3:EA:F4:3A:E2:76', name: 'Bluetooth device 2', type:Connection_Type.Bluetooth, connected:false }
];
