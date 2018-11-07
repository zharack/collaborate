import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Subscription } from '../../../node_modules/rxjs/Subscription';

/*
  Generated class for the GeoManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeoManagerProvider {

  //Propiedades
  public posActual: any;

  constructor(private geolocation: Geolocation) {
    console.log('Instanciando GeoManager');
  }

  //Metodos
  transformCall(elementBase){
    return elementBase;
  }

  public startWatch(): Observable<Geoposition> {
    return this.geolocation.watchPosition();
  }


}

