import { Subscription } from 'rxjs/Subscription';
import { GeoManagerData } from './geo-manager';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Geolocation, Geoposition, PositionError } from '@ionic-native/geolocation'; //TODO: fallo tipado
import Utils from '../../app/utils';
import { map } from 'rxjs/operator/map';

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
  public static SEND_DELAY=10000;
  public static DISTANCE_MIN = 0.00001; // kM

  //Propiedades
  private lastPosition: Position  = null;
  private observableCordova: Observable<Geoposition>;
  private subscribeCordova: Subscription = null;
  private observableManager:BehaviorSubject<GeoManagerModel> = new BehaviorSubject(null);

  private timecounter: any;

  constructor(private geolocation: Geolocation) {
    console.log('Instanciando GeoManager');
  }

  /**
   * Función para arrancar Geo Cordova y devolver nuestro obs
   */
  public startWatch():Observable<GeoManagerModel>{
    // si no esta arrancado geo cordova
    this.startCordova();
    console.log(this.subscribeCordova);

    if(!this.subscribeCordova){
			// subscribe
      this.subscribeCordova = this.observableCordova.subscribe((position)=>{
        console.group("[subscribeCordova]");
        console.log(position);
        console.groupEnd();

        // informamos a nuestro obs
        this.newPosition(position);
      });
      console.log(this.subscribeCordova);
    }
    return this.observableManager.asObservable().filter(ref=>{
      return ref!==null;
    });
    // TODO: Añadir un map con el control de errores.
  }


  transformCall(){
    let response = new GeoManagerModel();
    response.success = false;
    response.position = null;
    return response;
  }
   /**
   * Función que acepta peticiones entrantes de posiciones para un posible envio del manager obs
   */
  public newPosition(position: Position | PositionError): GeoManagerModel{
		// response

    let response  = this.transformCall();
    // tratamos errores
    // TODO: Añadir los errores de falta de gelocalizacion en el dispositivo
    // O falta de conexión a internet por network o modo avion....
    // o algun caso del device
    if(this.isInstanceOf<PositionError>(position, 'message')){
      response.error = position;
      response.success = false;
      response.position = this.lastPosition;
      this.send(response);
    }
    // tratamos posiciones
    else if(this.isInstanceOf<Position>(position, 'coords')){
      // introducimos como posible posicion
      // this.managerData.posicionPosible = position;

      // posicion valida?

      // TODO: Quitar bloqueo de la pantalla
      if(this.checkPosition(response)){
        // this.managerData.posicionRegistrada = position;
        response.success = true;
        response.position = position;
        this.lastPosition = position;
        this.send(response);
      }
    }

    return response;
  }


  private send(request:GeoManagerModel){
    // propagamos request a nuestro observable
    if(request && request!==null){
      if(request.success){
        this.observableManager.next(request);
      }else{
        this.observableManager.next(request);
      }
    }

    try{
      clearTimeout(this.timecounter);
    }catch(err){}
    debugger;
    this.timecounter = setTimeout(()=>{
      // this.geolocation.getCurrentPosition().then((ref)=>{
      //   let transformed = this.transformCall();
      //   transformed.position = ref;
      //   transformed.success = true;
      //   this.send(transformed);
      // })
      // TODO: Cambiar este valor por escucha activa
      // TODO: COmprobar que la respuesta no es erronea
        this.send(request);
    },GeoManagerProvider.SEND_DELAY);

    //log
    console.group("[subscribeManager - send Data]");
    console.log(request);
    console.log(this.lastPosition);
    console.groupEnd();
  }

	private checkPosition(response: GeoManagerModel): boolean {
    return this.checkDistance(response.position) && this.checkTime(response.position);
  }

  private checkDistance(posicionRef: Position){
    let success = true;

    if(posicionRef && this.lastPosition!==null){
      success = Utils.getDistanceFromLatLonInKm(
          posicionRef.coords.latitude,
          posicionRef.coords.longitude,
          this.lastPosition.coords.latitude,
          this.lastPosition.coords.longitude
        ) > GeoManagerProvider.DISTANCE_MIN;
    }
    return success;
  }

	private checkTime(response: Position): boolean {
		return true;
	}

  private startCordova(): Observable<Geoposition> {
    if(!this.observableCordova){
      this.observableCordova = this.geolocation.watchPosition();
    }
    return this.observableCordova;
  }

  private isInstanceOf<T>(object: any, property:string): object is T {
    return property in object;
  }
}

