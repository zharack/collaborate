import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//https://ionicthemes.com/tutorials/about/ionic-2-google-maps-google-places-geolocation
// Quitar el import de los elementos y dejar solo la carga de google en indexhtml
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
declare var google : any;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: GoogleMap;
  mapLoaded = false;
  subs;

  public autocomplete = {
    input:''
  }
  public autocompleteItems = [];
  public GoogleAutocomplete;
  public geocoder;
  public markers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public geoManager:GeoManagerProvider) { // , public googleMaps:GoogleMaps
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder;
  }


  updateSearchResults(results){
    console.log('updateSearchResults', results);
    debugger;
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      // this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      // });
    });
  }

  selectSearchResult(item){
    // this.clearMarkers();
    this.autocompleteItems = [];
  
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        let position = {
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
        };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.markers.push(marker);
        // this.map.setCenter(results[0].geometry.location);
      }
    })
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
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCvOaaXFM3Of838uif4O450lUNBt57JxD4',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCvOaaXFM3Of838uif4O450lUNBt57JxD4'
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
