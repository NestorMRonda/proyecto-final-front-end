import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';
import * as dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-detail-editprofile',
  templateUrl: './student-detail-editprofile.component.html',
  styleUrls: ['./student-detail-editprofile.component.css']
})
export class StudentDetailEditprofileComponent {
  formulario: FormGroup
  regExp: RegExp
  emailRegExp: RegExp
  file: any
  defaultStudent: any

  constructor(private studentService: StudentsService, private teacherService: TeachersService, private router: Router) {

    this.emailRegExp = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    this.regExp = new RegExp(/^(?=.*\d).{4,30}$/)
    this.file = ''

    this.formulario = new FormGroup({

      name: new FormControl('this.defaultStudent.name', [Validators.required]),
      surname: new FormControl('Obando', [Validators.required]),
      birthdate: new FormControl(null, [Validators.required]),
      email: new FormControl('manolito@gmail.com', [Validators.required, Validators.pattern(this.emailRegExp)]),
      phone: new FormControl('655875404', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),

    })
  }

  async ngOnInit() {

    this.defaultStudent = await this.teacherService.getUserByToken()
    console.log(this.defaultStudent)
    this.formulario.get('name')?.setValue(this.defaultStudent.name)
    this.formulario.get('surname')?.setValue(this.defaultStudent.surname)
    this.formulario.get('email')?.setValue(this.defaultStudent.email)
    this.formulario.get('phone')?.setValue(this.defaultStudent.phone)
    this.formulario.get('birthdate')?.setValue(dayjs(this.defaultStudent.birthdate).format('YYYY-MM-DD'))
  }

  async onSubmit() {
    const formu = this.formulario.value

    let fd = new FormData();
    if (this.file[0]) fd.append('avatar', this.file[0]);
    fd.append('name', formu.name)
    fd.append('surname', formu.surname)
    fd.append('birthdate', formu.birthdate)
    fd.append('email', formu.email)
    fd.append('phone', formu.phone)

    /* El id debería ser de defaultstudent.id,  */
    const user = await this.studentService.updateStudentProfile(this.defaultStudent.id, fd)

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Perfil actualizado con éxito',
      showConfirmButton: false,
      timer: 1500
    })

    this.router.navigate(['/profile/students/profile', this.defaultStudent.id])
  }

  checkError(campo: string, error: string): boolean | undefined {
    return this.formulario.get(campo)?.hasError(error) && this.formulario.get(campo)?.touched
  }


  onChange($event: any) {
    this.file = $event.target.files
  }
}

