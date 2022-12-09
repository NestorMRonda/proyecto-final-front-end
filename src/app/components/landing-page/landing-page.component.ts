import { Component } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent {
  arrBestSubjects: any[];
  arrSubjects: any[]

  arrTeachers: any[]
  arrBestTeachers: any[]
  constructor(private subjectService: SubjectsService, private teachersService: TeachersService) {
    this.arrBestSubjects = [];
    this.arrSubjects = []
    this.arrTeachers = []
    this.arrBestTeachers = []
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

}

