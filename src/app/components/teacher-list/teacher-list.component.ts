import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  price: number
  score: number
  asignatura: string
  city: string

  showScore: boolean
  showPrice: boolean

  arrTeachers: Teacher[]
  arrSubjects: Subject[]

  constructor(private teacherService: TeachersService, private subjectsService: SubjectsService, private router: Router) {
    this.arrTeachers = [];
    this.arrSubjects = [];

    this.price = 0;
    this.score = 0;
    this.asignatura = 'Asignatura'
    this.city = 'Ciudad'

    this.showPrice = false;
    this.showScore = false;

  }

  async ngOnInit() {
    this.arrTeachers = await this.teacherService.getAll()
    this.arrTeachers.map(teacher => teacher.experience = teacher.experience.slice(0, 180) + '...')

    this.arrSubjects = await this.subjectsService.getAll()
  }

  changeDisplayScore() {
    this.showScore = !this.showScore;
  }

  changeDisplayPrice() {
    this.showPrice = !this.showPrice;
  }

  onSubmit() {
    /* Estos son los valores de los filtros, utilizar cunado se creen los filtros en el teacher.service*/
    const filterData = { price: this.price, score: this.score, subject: this.asignatura, city: this.city }
    console.log(filterData)
  }

  onNavigate(pId: number) {
    this.router.navigate(['/teacher', pId])
  }
}
