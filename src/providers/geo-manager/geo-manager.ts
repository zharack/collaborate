import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

/*
  Generated class for the GeoManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


export class GeoManagerModel{

  position:Position
}

@Injectable()
export class GeoManagerProvider {

  public static delay=3000;
  public static distance = 0; // kM
  private lastTimestamp = 0;

  //Propiedades
  public posActual: any;
  private lastPositions: Array<Position> = [];

  private backgroundObservable: Observable<Geoposition> = null;

  private managerObservable:BehaviorSubject<GeoManagerModel> = new BehaviorSubject(new GeoManagerModel);



  constructor(private geolocation: Geolocation) {
    console.log('Instanciando GeoManager');
  }

  /**
   * Función que comprobará los datos pasados
   */
  private checkData(): void {
    let itOk = true;
    if(
      this.lastPositions[0].timestamp > this.lastTimestamp+GeoManagerProvider.delay
      ||
      this.checkDistance()
      ){
      itOk = false;
    }
    if(itOk){
      this.managerObservable.next(this.transformCall(this.lastPositions[0]));
    }
    this.lastTimestamp = this.lastPositions[0].timestamp;
  }

  public capture(){
    return this.managerObservable.asObservable();
  }

  private checkDistance(){
    let success = true;
    if(this.lastPositions.length===2){
      success = this.getDistanceFromLatLonInKm(
          this.lastPositions[0].coords.latitude,this.lastPositions[0].coords.longitude,
          this.lastPositions[1].coords.latitude, this.lastPositions[1].coords.longitude
        ) > GeoManagerProvider.distance;
    }
    return success;
  }


  //Metodos
  transformCall(elementBase:Position): GeoManagerModel{
    console.log('transformando', elementBase);
    let geoManagerRef = new GeoManagerModel;
    geoManagerRef.position = elementBase;
    return geoManagerRef;
  }

  private startWatch(): Observable<Geoposition> {
    return this.geolocation.watchPosition();
  }


  private setData(data:Position){
    if(this.lastPositions.length>0){
      this.lastPositions[1] = this.lastPositions[0];
    }
    this.lastPositions[0] = data;
    this.checkData();
    console.log('Mobile Position', JSON.stringify(this.lastPositions[0]));
  }


  /**
   * Función para arrancar el proceso en background y devolver el observatory que configuramos en nuestra aplicacion en vez del nativo
   */
  public background(){
    if(!this.backgroundObservable){
      this.backgroundObservable = this.startWatch();
      this.backgroundObservable.subscribe((data)=>{
        this.setData(data);
      });
    }
    return this.backgroundObservable;
  }

  private getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    const deg2rad = function(deg) {
      return deg * (Math.PI/180)
    }
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }


}

