import { Component } from '@angular/core';
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

  showScore: boolean
  showPrice: boolean

  arrTeachers: any[]
  arrSubjects: any[]

  constructor(private teacherService: TeachersService, private subjectsService: SubjectsService) {
    this.arrTeachers = [];
    this.arrSubjects = [];
    this.price = 0;
    this.score = 0;

    this.showPrice = false;
    this.showScore = false;

  }

  async ngOnInit() {
    this.arrTeachers = await this.teacherService.getAll()
    this.arrSubjects = await this.subjectsService.getAll()
  }

  changeDisplayScore() {
    console.log(this.showScore)
    this.showScore = !this.showScore;
  }

  changeDisplayPrice() {
    this.showPrice = !this.showPrice;
  }
}
