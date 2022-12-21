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
    await this.teachersService.getStudentsByTeacher()
  }

}
