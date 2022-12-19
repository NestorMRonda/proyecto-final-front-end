import { Component } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-request',
  templateUrl: './teacher-request.component.html',
  styleUrls: ['./teacher-request.component.css']
})
export class TeacherRequestComponent {
  arrRequest: any[]
  constructor(private teacherService: TeachersService) {
    this.arrRequest = []
  }

  async ngOnInit() {
    this.arrRequest = await this.teacherService.getUserPending()
  }


}
