import { Component } from '@angular/core';
import { StudentsService } from './services/students.service';
import { TeachersService } from './services/teachers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto-final-front-end';
  user: any

  constructor(public studentService: StudentsService, private teacherService: TeachersService) {

    this.user = ''
  }

  async ngOnInit() {
    this.user = await this.teacherService.getUserByToken()
  }


  logOut() {
    return this.studentService.Logout()
  }

}
