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
  constructor(private teachersService: TeachersService, private activatedRoute: ActivatedRoute) {
    this.teacher = {};
  }


  ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {
      console.log(+params['teacherId'])

      this.teacher = await this.teachersService.getById(+params['teacherId'])
      console.log(this.teacher)
    })
  }

}
