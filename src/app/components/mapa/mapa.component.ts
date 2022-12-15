/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts" />

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  //Espacio donde voy a colocar el mapa
  @ViewChild('divMapa') divMapa!: ElementRef;

  //Recuperamos el input text, los viewChild siempre son del tipo ElementRef
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  mapa!: google.maps.Map;
  markers: google.maps.Marker[]
  posicionInicial!: google.maps.LatLng;

  constructor() {
    this.markers = []
  }

  ngOnInit(): void {
    //El objeto navigator nos permite recuperar la posición del dispositivo.
    //getCurrentPosition tiene 2 parámetros, uno la función y otro lo que hace si da error
    navigator.geolocation.getCurrentPosition((posicion) => {
      const myPosition = new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude)
      // Esto sustituye al center que pusimos abajo en el options.
      this.posicionInicial = myPosition
      this.mapa.setCenter(myPosition)


      //Marcador en mi posicion
      const marker = new google.maps.Marker({
        position: myPosition,
        map: this.mapa,
        animation: google.maps.Animation.BOUNCE,
      })
    },)
  }
  ngAfterViewInit() {
    //Haremos que se cargue aquí el mapa ya que este método se ejecuta cuando ya se ha cargado todo el componente, algo imprescindible para los mapas.
    this.loadMap()
  }

  loadMap() {
    // Creacion del mapa
    // Opciones de creación
    const options = {
      /* Las claves tienen que ser esas, es lo que especifica la API de google maps */
      //latitud y longitud
      center: new google.maps.LatLng(38.87, -10.87),
      // te acerco o aleja lo que ves en el mapa
      zoom: 19,
      // El tipo de mapa que se muestra
      mapTypeId: google.maps.MapTypeId.HYBRID
    }
    //Incluimos mapa dentro del div, y options le da las características
    this.mapa = new google.maps.Map(this.divMapa.nativeElement, options)


  }



}
