import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent {
  student: any
  coments: any
  url: string
  constructor(private StudentsService: StudentsService, private activatedRoute: ActivatedRoute) {
    this.student = {};
    this.coments = [];
    this.url = "";
  }


  ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {


      this.student = await this.StudentsService.getById(+params['studentId'])
      if (this.student.avatar !== "undefined") {
        this.url = `http://localhost:3000/images/${this.student.avatar}`
      } else {
        this.url = "../../assets/images/Teacher_icon.png"
      }

      this.coments = await this.StudentsService.getComents(+params['studentId'])

    })



    
  }

}
