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
  url: string;

  formulario: FormGroup
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

    this.url="";
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
          this.url =`http://localhost:3000/images/${teacher.avatar}`
        } else {
          this.url="../../assets/images/Teacher_icon.png"
        }
        teacher.avatar = this.url
        teacher.experience = teacher.experience.slice(0, 200) + '...';
        this.arrBestTeachers.push(teacher)        
      }
    }
  }


  onSubmit() {
    const formu = this.formulario.value
    this.router.navigate(['/list', 'teacher'], {
      queryParams: {
        subject: formu.subject,
        city: formu.city,
        remote: formu.remote
      }
    })
  }

  onNavigate(pId: number): void {
    this.router.navigate(['/teacher', pId])
  }
}

