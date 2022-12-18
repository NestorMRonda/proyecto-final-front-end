/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts" />

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/interfaces/subject.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent {

  //Espacio donde voy a colocar el mapa
  @ViewChild('divMapa') divMapa!: ElementRef;

  //Recuperamos el input text, los viewChild siempre son del tipo ElementRef
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  mapa!: google.maps.Map;
  markers: google.maps.Marker[]
  posicionInicial!: google.maps.LatLng;


  price!: number
  score!: number
  asignatura: string
  city: string
  remote: boolean

  showScore: boolean
  showPrice: boolean

  arrTeachers: Teacher[]
  arrSubjects: Subject[]

  url: string;

  constructor(private teacherService: TeachersService, private subjectsService: SubjectsService, private router: Router, private activatedRouter: ActivatedRoute) {
    this.markers = []
    this.arrTeachers = [];
    this.arrSubjects = [];

    this.asignatura = ''
    this.city = ''
    this.remote = false

    this.showPrice = false;
    this.showScore = false;

    this.url = ""

  }

  async ngOnInit() {

    this.activatedRouter.queryParams.subscribe(async (params) => {

      const filterData = { price: this.price, score: this.score, subject: params['subject'], remote: (params['remote'] === "true") ? true : false }
      this.arrTeachers = await this.teacherService.filterTeacherList(filterData)
      this.arrTeachers.map(teacher => teacher.experience = teacher.experience.slice(0, 180) + '...')
      this.arrTeachers.map(teacher => {
        if (teacher.avatar !== "undefined") { teacher.avatar = `http://localhost:3000/images/${teacher.avatar}` }
        else {
          teacher.avatar = "../../assets/images/Teacher_icon.png"
        }
      })
    })
    /* if (this.arrTeachers.length === 0) this.arrTeachers = await this.teacherService.getAll() */

    if (this.arrTeachers) {
      for (let teacher of await this.teacherService.getAll()) {
        const Position = new google.maps.LatLng(teacher.lat!, teacher.long!)
        const marker = new google.maps.Marker({
          position: Position,
          map: this.mapa,
          animation: google.maps.Animation.BOUNCE,
          icon: {
            url: 'https://imgs.search.brave.com/eaL74z0xZyWFghCrbjVzxh4XOAKm5U-TyZR_6-VtfTM/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/cGlrcG5nLmNvbS9w/bmdsL2IvNDE2LTQx/NjUwMDNfaWNvbi1n/b29nbGUtbWFwLWJs/dWUtcGluLWNsaXBh/cnQucG5n',
            scaledSize: new google.maps.Size(25, 25)
          },
          title: teacher.name + ' ' + teacher.subject,
        })

        const contentString =
          '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading" style= "font-weight: bold;"><b>' + teacher.name + ' ' + teacher.surname + '</b></h1>' +
          '<div id="bodyContent">' +
          '<p> ' + teacher.experience + '</p>' +
          '<p style= "font-weight: bold;">' + teacher.subject + '</p>' +
          "</div>" +
          "</div>";

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener("mouseover", () => {
          infowindow.open(this.mapa, marker);
        });

        marker.addListener("mouseout", () => {
          infowindow.close();
        });

        google.maps.event.addListener(marker, 'click', () => {
          this.router.navigate(['/profile', 'teacher', 'profile', teacher.id])
        })



      }
    }


    this.arrSubjects = await this.subjectsService.getAll()


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
    this.loadAutocomplete()
  }


  markerMaker(position: google.maps.LatLng, mapa: google.maps.Map, animacion: google.maps.Animation): google.maps.Marker {
    return new google.maps.Marker({
      position, //Esto realmente es position: position, pero como la clave y el valor del objeto son lo mismo podemos poner solo la clave.
      map: mapa,
      animation: animacion,
      icon: {
        url: 'https://imgs.search.brave.com/EpU5KjrQ15WVBGBHq0zUJiyg5q4LAFAubO2QFMIOmS8/rs:fit:512:512:1/g:ce/aHR0cHM6Ly9jZG4u/aWNvbi1pY29ucy5j/b20vaWNvbnMyLzI2/MzEvUE5HLzUxMi9n/b29nbGVfbWFwc19u/ZXdfbG9nb19pY29u/XzE1OTE0Ny5wbmc',
        scaledSize: new google.maps.Size(40, 40)
      }
    })
  }

  changeDisplayScore() {
    this.showScore = !this.showScore;
  }

  changeDisplayPrice() {
    this.showPrice = !this.showPrice;
  }


  async onSubmit() {
    /* Estos son los valores de los filtros, utilizar cunado se creen los filtros en el teacher.service*/
    const filterData = { price: this.price, score: this.score, subject: this.asignatura, remote: this.remote }
    this.arrTeachers = await this.teacherService.filterTeacherList(filterData)

  }

  onNavigate(pId: number) {
    this.router.navigate(['/teacher', pId])
  }

  loadMap() {
    // Creacion del mapa
    // Opciones de creación
    const options = {

      zoom: 14,
      // El tipo de mapa que se muestra
      mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    //Incluimos mapa dentro del div, y options le da las características
    this.mapa = new google.maps.Map(this.divMapa.nativeElement, options)
  }

  loadAutocomplete(): void {
    //Al trabajar con ViewChild al poner el inputPlaces para capturar el elemento propio necesitamos la propiedad nativeElement, y ahora si le podemos poner el .value.....

    const autocomplete = new google.maps.places.Autocomplete(this.inputPlaces.nativeElement,)
    //El Autocomplete hace que aparezca una preview de la calle para que el usuario seleccione la correcta, el tipico autocompletado.

    //place_changed es el evento que nos permite cambiar el lugar que se muestra en el mapa
    google.maps.event.addListener(autocomplete, 'place_changed', (event) => {
      const place = autocomplete.getPlace()
      this.mapa.setCenter(place.geometry!.location)
      const marker = this.markerMaker(place.geometry!.location, this.mapa, google.maps.Animation.DROP)
      marker.setAnimation(google.maps.Animation.BOUNCE)
    })
  }

}
