import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-student-detail-navbar',
  templateUrl: './student-detail-navbar.component.html',
  styleUrls: ['./student-detail-navbar.component.css']
})
export class StudentDetailNavbarComponent {
  student: any;

  constructor(
    private teachersService: TeachersService) {
    this.student = {}
  }

  async ngOnInit() {
    this.student = await this.teachersService.getUserByToken()


  }
}
