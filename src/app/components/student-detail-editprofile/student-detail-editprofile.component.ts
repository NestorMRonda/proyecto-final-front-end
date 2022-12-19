import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';
import * as dayjs from 'dayjs';

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

  constructor(private studentService: StudentsService, private teacherService: TeachersService) {

    this.emailRegExp = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    this.regExp = new RegExp(/^(?=.*\d).{4,30}$/)
    this.file = ''

    this.formulario = new FormGroup({

      name: new FormControl('this.defaultStudent.name', [Validators.required]),
      surname: new FormControl('Obando', [Validators.required]),
      birthdate: new FormControl(null, [Validators.required]),
      email: new FormControl('manolito@gmail.com', [Validators.required, Validators.pattern(this.emailRegExp)]),
      phone: new FormControl('655875404', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),

    }, [this.repitePasswordValidator])
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

    console.log(fd)
    /* El id debería ser de defaultstudent.id,  */
    const user = await this.studentService.updateStudentProfile(this.defaultStudent.id, fd)

  }

  checkError(campo: string, error: string): boolean | undefined {
    return this.formulario.get(campo)?.hasError(error) && this.formulario.get(campo)?.touched
  }

  repitePasswordValidator(form: AbstractControl) {
    const passwordValue = form.get('password')?.value;
    const repitePasswordValue = form.get('repitePassword')?.value;

    if (passwordValue === repitePasswordValue) {

      form.get('repitePassword')?.setErrors(null)
      return null
    } else {
      form.get('repitePassword')?.setErrors({ repitepasswordvalidator: true });
      return { repitepasswordvalidator: true }
    }
  }

  onChange($event: any) {
    this.file = $event.target.files
  }
}

