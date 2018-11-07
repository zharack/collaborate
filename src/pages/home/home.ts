import { GeoManagerProvider } from './../../providers/geo-manager/geo-manager';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geoposition } from '../../../node_modules/@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController, public geolocation: GeoManagerProvider) {
  }

  posicion: any;

  ngOnInit(){
    this.posicion = this.geolocation.startWatch().subscribe(
      pos => {
        this.posicion = pos;
        console.log(this.posicion.coords);
      }
    );


  }

}
