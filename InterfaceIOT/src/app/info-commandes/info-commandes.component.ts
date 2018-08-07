import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-commandes',
  templateUrl: './info-commandes.component.html',
  styleUrls: ['./info-commandes.component.css']
})
export class InfoCommandesComponent implements OnInit {
  device_name = 'Robot Dessinateur';
  constructor() { }

  ngOnInit() {
  }

}
