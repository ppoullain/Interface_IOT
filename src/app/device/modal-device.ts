import {Input, Component} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Device } from './device';
import { DeviceService} from './device.service';


@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './modal-device.html'
})
export class NgbdModalBasic {
  closeResult: string;
  @Input() device:Device;
  constructor(private modalService: NgbModal, private deviceService: DeviceService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onConnect(){
    console.log("connexion ...");
    this.deviceService.connection(this.device.id);
  }

  onDisconnect(){
    console.log("déconnexion ...");
    this.deviceService.disconnection(this.device.id);
  }
}