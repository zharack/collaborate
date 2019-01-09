import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  // CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { GeoManagerProvider, GeoManagerModel } from '../../providers/geo-manager/geo-manager';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: GoogleMap;
  mapLoaded = false;
  subs;
  constructor(public navCtrl: NavController, public navParams: NavParams, public geoManager:GeoManagerProvider) { // , public googleMaps:GoogleMaps
  }

  ionViewWillUnload(){
    alert(123);
    // this.subs.unsubscribe();
  }
  
  ionViewDidLoad() {
      this.loadMap();
  }
  loadMap(): any {
        // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBbuIOXmkpNn0x8dypFRAaSzJsUi9DxsPo',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBbuIOXmkpNn0x8dypFRAaSzJsUi9DxsPo'
    });


    this.geoManager.startWatch().subscribe((ref:GeoManagerModel)=>{
      console.log('STARTING', ref);
      if(ref && ref.success && !this.mapLoaded){
        let mapOptions: GoogleMapOptions = {
          camera: {
              target: {
                lat: ref.position.coords.latitude,
                lng: ref.position.coords.longitude
              },
              zoom: 18,
              tilt: 30
            }
        };
        this.map = GoogleMaps.create('map_canvas', mapOptions);
        this.mapLoaded=true;
      }

    })


    // let marker: Marker = this.map.addMarkerSync({
    //   title: 'Ionic',
    //   icon: 'blue',
    //   animation: 'DROP',
    //   position: {
    //     lat: 43.0741904,
    //     lng: -89.3809802
    //   }
    // });
    // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //   alert('clicked');
    // });
  }


  myPosition(){

  }
}
