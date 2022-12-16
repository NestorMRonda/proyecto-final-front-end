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
    private teachersService: TeachersService) {
    this.teacher = {}
  }

  async ngOnInit() {
    this.teacher = await this.teachersService.getUserByToken()
    console.log(this.teacher.id)

  }




}
