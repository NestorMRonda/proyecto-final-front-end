import { Component } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-student-has-teachers',
  templateUrl: './student-has-teachers.component.html',
  styleUrls: ['./student-has-teachers.component.css']
})
export class StudentHasTeachersComponent {
  arrTeachers: any[]


  constructor(private studentsService: StudentsService,private teachersService: TeachersService){
    this.arrTeachers = []
  }

  async ngOnInit(){
    const userLogged = await this.teachersService.getUserByToken()
    
    this.arrTeachers= await this.studentsService.getTeachersByStudent(userLogged.id) 
    console.log(this.arrTeachers)
    this.arrTeachers.map(teacher => {
      console.log(teacher)
      if (teacher.avatar !== "undefined") { teacher.avatar = `http://localhost:3000/images/${teacher.avatar}` }
      else {
        teacher.avatar = "../../assets/images/Teacher_icon.png"
      }
    })
  }
}
