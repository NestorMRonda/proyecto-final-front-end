import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-detail-navbar',
  templateUrl: './teacher-detail-navbar.component.html',
  styleUrls: ['./teacher-detail-navbar.component.css']
})
export class TeacherDetailNavbarComponent {

  teacher: any;

  constructor(
    private teachersService: TeachersService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.teacher = {}
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {

      this.teacher = await this.teachersService.getById(+params['teacherId'])

    })
  }




}
