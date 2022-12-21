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
    console.log(this.arrRequest)
  }

  async onClick(pStatus: string, userId: number) {
    let teacher = await this.teacherService.getUserByToken()
    await this.teacherService.updateStatus({
      status: pStatus,
      user_id: userId,
      teacher_id: teacher.id
    })

    this.arrRequest = await this.teacherService.getUserPending()
  }

}
