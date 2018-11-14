import { Subscription } from 'rxjs/Subscription';
import { GeoManagerData } from './geo-manager';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Geolocation, Geoposition, PositionError } from '@ionic-native/geolocation'; //TODO: fallo tipado
import Utils from '../../app/utils';

/*
  Generated class for the GeoManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


export class GeoManagerModel{
  position:Position;
	success: boolean;
	error?:PositionError;
}
export interface GeoManagerData<T> {
  posicionRegistrada?: T;
  posicionPosible?: T;
}

@Injectable()
export class GeoManagerProvider {

  // Config
  public static SEND_DELAY=3000;
  public static DISTANCE_MIN = 0.001; // kM

  //Propiedades
  private managerData: GeoManagerData<Position> = {};
  private observableCordova: Observable<Geoposition>;
  private subscribeCordova: Subscription;
  private observableManager:BehaviorSubject<GeoManagerModel> = new BehaviorSubject(new GeoManagerModel);

  constructor(private geolocation: Geolocation) {
    console.log('Instanciando GeoManager');
  }

  /**
   * Función para arrancar Geo Cordova y devolver nuestro obs
   */
  public startWatch():Observable<GeoManagerModel>{
		// si no esta arrancado geo cordova
    if(!this.observableCordova){
			// arrancamos
			this.observableCordova = this.startCordova();

			// subscribe
      this.subscribeCordova = this.observableCordova.subscribe((position)=>{
        console.group("[subscribeCordova]");
        console.log(position);
        console.groupEnd();

        // informamos a nuestro obs
        this.newPosition(position);
      });
    }
    return this.observableManager.asObservable();
  }

   /**
   * Función que acepta peticiones entrantes de posiciones para un posible envio del manager obs
   */
  public newPosition(position: Position | PositionError): GeoManagerModel{
		// response
    let response = new GeoManagerModel();
    response.success = false;
    response.position = null;

    // tratamos errores
    if(this.isInstanceOf<PositionError>(position, 'message')){
      response.error = position;
      this.send(response);
    }
    // tratamos posiciones
    else if(this.isInstanceOf<Position>(position, 'coords')){
      // introducimos como posible posicion
      this.managerData.posicionPosible = position;

      // posicion valida?
      if(this.checkPosition()){
        this.managerData.posicionRegistrada = position;
        response.success = true;
        response.position = position;
        this.send(response);
      }
    }

    return response;
  }

  public getNativeGeo():Observable<Geoposition>{
    return this.startCordova();
  }

  private send(request:GeoManagerModel){
		// propagamos request a nuestro observable
    this.observableManager.next(request);

    //log
    console.group("[subscribeManager]");
    console.log(request);
    console.groupEnd();
  }

	private checkPosition(): boolean {
    return this.checkDistance() && this.checkTime();
  }

  private checkDistance(){
    let success = true;

    if(this.managerData.posicionRegistrada && this.managerData.posicionPosible){
      success =
      Utils.getDistanceFromLatLonInKm(
          this.managerData.posicionRegistrada.coords.latitude,
          this.managerData.posicionRegistrada.coords.longitude,
          this.managerData.posicionPosible.coords.latitude,
          this.managerData.posicionPosible.coords.longitude
        ) > GeoManagerProvider.DISTANCE_MIN;
    }
    return success;
  }

	private checkTime(): boolean {
		return true;
	}

  private startCordova(): Observable<Geoposition> {
    return this.geolocation.watchPosition();
  }

  private isInstanceOf<T>(object: any, property:string): object is T {
    return property in object;
  }
}

