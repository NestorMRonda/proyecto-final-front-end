import { Component } from '@angular/core';
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

  arrTeachers: any[];
  arrBestTeachers: any[];

  formulario: FormGroup
  constructor(private subjectService: SubjectsService, private teachersService: TeachersService, private router: Router) {
    this.arrBestSubjects = [];
    this.arrSubjects = [];
    this.arrTeachers = [];
    this.arrBestTeachers = [];

    this.formulario = new FormGroup({
      subject: new FormControl(''),
      city: new FormControl(''),
      remote: new FormControl('')
    })
  }

  async ngOnInit() {
    this.arrSubjects = await this.subjectService.getAll()
    for (let subject of this.arrSubjects) {
      //Esto hace que en el array de muestra de solo aparezcan las primeras 5 asignaturas de la base de datos
      if (this.arrBestSubjects.length < 5) {
        this.arrBestSubjects.push(subject)
      }
    }

    //Petición back que devuelva score y subject
    this.arrTeachers = await this.teachersService.getAll();

    for (let teacher of this.arrTeachers) {
      //Esto hace que en el array de muestra de solo aparezcan las primeras 5 asignaturas de la base de datos
      if (this.arrBestTeachers.length < 4) {
        this.arrBestTeachers.push(teacher)
      }
    }
  }


  onSubmit() {

    console.log(this.formulario.value)
    this.router.navigate(['/list', 'teacher'])
  }
}

