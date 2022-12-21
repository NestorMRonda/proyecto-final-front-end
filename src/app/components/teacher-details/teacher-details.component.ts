import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent {
  teacher: any
  coments: any
  url: string
  paramId: number
  studentId: any
  constructor(private teachersService: TeachersService, private activatedRoute: ActivatedRoute, public studentService: StudentsService, private router: Router) {
    this.teacher = {};
    this.coments = [];
    this.url = "";
    this.paramId = 0
    this.studentId = {}
  }


  async ngOnInit() {

    /* La linea treinta sirve para que en caso de que seas profesor no te aparezca tu propio botón de solicitar clases pero si el de otros profesores, y de esta manera puedas recibir clases aunque seas profesor */
    if (this.studentService.isLogged()) this.studentId = await this.teachersService.getUserByToken()

    this.activatedRoute.params.subscribe(async params => {

      this.paramId = +params['teacherId']
      this.teacher = await this.teachersService.getById(+params['teacherId'])
      if (this.teacher.avatar !== "undefined") {
        this.url = `http://localhost:3000/images/${this.teacher.avatar}`
      } else {
        this.url = "../../assets/images/Teacher_icon.png"
      }

      this.coments = await this.teachersService.getComents(+params['teacherId'])
    })


  }


  async onClick(pTeacherId: number) {
    const student = await this.teachersService.getUserByToken()
    await this.teachersService.newStudent({ user_id: student.id, teacher_id: pTeacherId })

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Ya hemos enviado la solicitud a tu profesor',
      showConfirmButton: false,
      timer: 1500
    })

    this.router.navigate([`/profile/students/profile`, student.id])

  }
}
