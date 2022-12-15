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
      const filterData = { price: this.price, score: this.score, subject: params['subject'], city: params['city'], remote: (params['remote'] === "true") ? true : false }
      this.arrTeachers = await this.teacherService.filterTeacherList(filterData)
      this.arrTeachers.map(teacher => teacher.experience = teacher.experience.slice(0, 180) + '...')
      this.arrTeachers.map(teacher => { teacher.avatar = `http://localhost:3000/images/${teacher.avatar}`; console.log(teacher.avatar) })
    })

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
  }

  changeDisplayScore() {
    this.showScore = !this.showScore;
  }

  changeDisplayPrice() {
    this.showPrice = !this.showPrice;
  }


  async onSubmit() {
    /* Estos son los valores de los filtros, utilizar cunado se creen los filtros en el teacher.service*/
    const filterData = { price: this.price, score: this.score, subject: this.asignatura, city: this.city, remote: this.remote }
    this.arrTeachers = await this.teacherService.filterTeacherList(filterData)
    console.log(filterData)
  }

  onNavigate(pId: number) {
    this.router.navigate(['/teacher', pId])
  }

  loadMap() {
    // Creacion del mapa
    // Opciones de creación
    const options = {
      /* Las claves tienen que ser esas, es lo que especifica la API de google maps */
      //latitud y longitud
      // te acerco o aleja lo que ves en el mapa
      zoom: 19,
      // El tipo de mapa que se muestra
      mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    //Incluimos mapa dentro del div, y options le da las características
    this.mapa = new google.maps.Map(this.divMapa.nativeElement, options)
  }

}
