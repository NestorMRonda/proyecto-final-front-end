import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-student-detail-navbar',
  templateUrl: './student-detail-navbar.component.html',
  styleUrls: ['./student-detail-navbar.component.css']
})
export class StudentDetailNavbarComponent {
  teacher: any;

  constructor(
    private teachersService: TeachersService ,
    private router: Router, 
    private activatedRoute: ActivatedRoute)
    {
    this.teacher= {}
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(async params => {
      console.log(+params['teacherId'])

      this.teacher = await this.teachersService.getById(+params['teacherId'])
      console.log(this.teacher)
    })
  } 
}
