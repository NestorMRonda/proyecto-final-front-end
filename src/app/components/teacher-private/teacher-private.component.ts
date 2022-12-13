import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-private',
  templateUrl: './teacher-private.component.html',
  styleUrls: ['./teacher-private.component.css']
})
export class TeacherPrivateComponent {
  teacher: any
  coments: any
  constructor(private teachersService: TeachersService, private activatedRoute: ActivatedRoute) {
    this.teacher = {};
    this.coments = [];
  }


  ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {
      console.log(+params['teacherId'])

      this.teacher = await this.teachersService.getById(+params['teacherId'])
      console.log(this.teacher)

      this.coments = await this.teachersService.getComents(+params['teacherId'])
      console.log(this.coments)
    })
  }
  
}
