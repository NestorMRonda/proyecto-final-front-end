import { Component } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  arrUsers: any[]

  constructor(private studentService: StudentsService, private teacherService: TeachersService) {


    this.arrUsers = []


  }

  async ngOnInit() {
    this.arrUsers = await this.studentService.getAll()

  }


  async selectType(pType: string) {

    if (pType === 'user') this.arrUsers = await this.studentService.getAll()

    if (pType === 'teacher') this.arrUsers = await this.teacherService.getAll()


  }

  async selectTypeInactive(pType: string) {

    if (pType === 'user') this.arrUsers = await this.studentService.getInactive()

    if (pType === 'teacher') this.arrUsers = await this.teacherService.getInactive()


  }


}
