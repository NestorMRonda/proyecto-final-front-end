import { Component } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-has-students',
  templateUrl: './teacher-has-students.component.html',
  styleUrls: ['./teacher-has-students.component.css']
})
export class TeacherHasStudentsComponent {
  arrStudents: any[]


  constructor(private teachersService: TeachersService){
    this.arrStudents = []
  }

  async ngOnInit(){
    const teacherLogged = await this.teachersService.getUserByToken()
    this.arrStudents= await this.teachersService.getStudentsByTeacher(teacherLogged.id) 
    this.arrStudents.map(student => {
      if (student.avatar !== "undefined") { student.avatar = `http://localhost:3000/images/${student.avatar}` }
      else {
        student.avatar = "../../assets/images/Teacher_icon.png"
      }
    })
  }

}
