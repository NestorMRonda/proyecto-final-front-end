import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

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


    this.formulario = new FormGroup({

      name: new FormControl('this.defaultStudent.name', [Validators.required]),
      surname: new FormControl('Obando', [Validators.required]),
      birthdate: new FormControl(null, [Validators.required]),
      email: new FormControl('manolito@gmail.com', [Validators.required, Validators.pattern(this.emailRegExp)]),
      password: new FormControl('test1234', [Validators.required, Validators.pattern(this.regExp)]),
      repitePassword: new FormControl('test1234', [Validators.required, Validators.pattern(this.regExp)]),
      phone: new FormControl('655875404', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      image: new FormControl('undefined')

    }, [this.repitePasswordValidator])
  }

  async ngOnInit() {

    this.defaultStudent = await this.teacherService.getUserByToken()
  }

  async onSubmit() {
    const formu = this.formulario.value

    let fd = new FormData();
    /* fd.append('avatar', this.file[0]); */ //Para que funcione con el avatar hay que ponerle un valor predeterminado o añadir un archivo al input file antes de enviarlo.
    fd.append('name', formu.name)
    fd.append('surname', formu.surname)
    fd.append('birthdate', formu.birthdate)
    fd.append('email', formu.email)
    fd.append('password', formu.password)
    fd.append('phone', formu.phone)


    /* El id debería ser de defaultstudent.id,  */
    const user = await this.studentService.updateStudentProfile(89, fd)

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

