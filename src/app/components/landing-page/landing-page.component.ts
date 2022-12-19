import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent {
  arrBestSubjects: any[];
  arrSubjects: any[];
  lat!: number
  long!: number
  arrTeachers: any[];
  arrBestTeachers: any[];
  url: string;

  formulario: FormGroup

  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  constructor(private subjectService: SubjectsService, private teachersService: TeachersService, private router: Router) {
    this.arrBestSubjects = [];
    this.arrSubjects = [];
    this.arrTeachers = [];
    this.arrBestTeachers = [];

    this.formulario = new FormGroup({
      subject: new FormControl(''),
      city: new FormControl(''),
      remote: new FormControl(false)
    })

    this.url = "";
  }

  async ngOnInit() {
    this.arrSubjects = await this.subjectService.getAll()
    for (let subject of this.arrSubjects) {
      //Esto hace que en el array de muestra de solo aparezcan las primeras 5 asignaturas de la base de datos
      if (this.arrBestSubjects.length < 5) {
        this.arrBestSubjects.push(subject)
      }
    }

    //Petición back que devuelva aquellos profesores con mejor puntuación.
    // Hacerlo como slider
    //limitar el teacher.experience a 50 caracteres
    this.arrTeachers = await this.teachersService.sortByScore();

    for (let teacher of this.arrTeachers) {

      if (this.arrBestTeachers.length < 3) {
        /* Aquí el limitado a x caracteres */
        if (teacher.avatar !== "undefined") {
          this.url = `http://localhost:3000/images/${teacher.avatar}`
        } else {
          this.url = "../../assets/images/Teacher_icon.png"
        }
        teacher.avatar = this.url
        teacher.experience = teacher.experience.slice(0, 200) + '...';
        this.arrBestTeachers.push(teacher)
        this.arrBestTeachers.map(teacher => { teacher.avatar = `http://localhost:3000/images/${teacher.avatar}`; })
      }
    }
  }


  onSubmit() {
    const formu = this.formulario.value
    this.router.navigate(['/list', 'teacher'], {
      queryParams: {
        subject: formu.subject,
        city: this.inputPlaces.nativeElement.value,
        remote: formu.remote,
        lat: this.lat,
        lng: this.long
      }
    })
  }

  onNavigate(pId: number): void {
    this.router.navigate(['/teacher', pId])
  }

  ngAfterViewInit() {
    this.loadAutocomplete()
  }

  loadAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.inputPlaces.nativeElement,)
    google.maps.event.addListener(autocomplete, 'place_changed', (event) => {
      const place = autocomplete.getPlace()

      console.log(place.geometry!.location)
      this.lat = place.geometry!.location.lat()
      this.long = place.geometry!.location.lng()
      console.log(this.lat, this.long)

    })

  }
}

