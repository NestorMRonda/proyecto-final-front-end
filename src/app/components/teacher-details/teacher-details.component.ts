import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent {
  teacher: any
  coments: any
  url: string
  constructor(private teachersService: TeachersService, private activatedRoute: ActivatedRoute) {
    this.teacher = {};
    this.coments = [];
    this.url = "";
  }


  ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {


      this.teacher = await this.teachersService.getById(+params['teacherId'])
      if (this.teacher.avatar !== "undefined") {
        this.url = `http://localhost:3000/images/${this.teacher.avatar}`
      } else {
        this.url = "../../assets/images/Teacher_icon.png"
      }


      this.coments = await this.teachersService.getComents(+params['teacherId'])
    })
  }

}
