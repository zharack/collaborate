import { GeoManagerProvider, GeoManagerModel } from './../../providers/geo-manager/geo-manager';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geoposition } from '../../../node_modules/@ionic-native/geolocation';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {
  posicion: Subscription;
  public show: string;


  constructor(public navCtrl: NavController, public geolocation: GeoManagerProvider) {
  }


  ngOnInit(){
    this.geolocation.capture().subscribe((val:GeoManagerModel)=>{
      console.log('i got that', val);
      this.show = JSON.stringify(val);
    })

  }
  ngOnDestroy(): void {

  }

}
