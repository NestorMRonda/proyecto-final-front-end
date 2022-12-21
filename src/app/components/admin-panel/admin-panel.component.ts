import { Component } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  arrUsers: any[];
  url: string

  constructor(private studentService: StudentsService, private teacherService: TeachersService) {
    this.arrUsers = []
    this.url = ""
  }

  urlChanger(pArr: any[]) {
    for (let student of pArr) {
      if (student.avatar !== "undefined") {
        console.log(student.avatar)
        this.url = `http://localhost:3000/images/${student.avatar}`
      } else {
        this.url = "../../assets/images/Teacher_icon.png"
      }
    }
  }

  async ngOnInit() {
    this.arrUsers = await this.studentService.getAll()

    this.arrUsers.map(user => {
      if (user.avatar !== "undefined") { user.avatar = `http://localhost:3000/images/${user.avatar}` }
      else {
        user.avatar = "../../assets/images/Teacher_icon.png"
      }
    })
  }


  async selectType(pType: string) {
    if (pType === 'user') this.arrUsers = await this.studentService.getAll()
    if (pType === 'teacher') this.arrUsers = await this.teacherService.getAll()
    this.arrUsers.map(user => {
      if (user.avatar !== "undefined") { user.avatar = `http://localhost:3000/images/${user.avatar}` }
      else {
        user.avatar = "../../assets/images/Teacher_icon.png"
      }
    })
  }

  async selectTypeInactive(pType: string) {
    if (pType === 'user') this.arrUsers = await this.studentService.getInactive()
    if (pType === 'teacher') this.arrUsers = await this.teacherService.getInactive()
    this.arrUsers.map(user => {
      if (user.avatar !== "undefined") { user.avatar = `http://localhost:3000/images/${user.avatar}` }
      else {
        user.avatar = "../../assets/images/Teacher_icon.png"
      }
    })
  }

  //Si queremos desactivarlo en el segundo parámetro le pasamos un 0, si queremos activarlo le pasamos un 1
  async changeStatus(pId: number, active: number) {
    await this.studentService.changeActivation({ id: pId, active })
    this.arrUsers = await this.studentService.getAll()
    this.arrUsers.map(user => {
      if (user.avatar !== "undefined") { user.avatar = `http://localhost:3000/images/${user.avatar}` }
      else {
        user.avatar = "../../assets/images/Teacher_icon.png"
      }
    })
  }


}
