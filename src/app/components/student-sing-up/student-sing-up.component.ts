import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-sing-up',
  templateUrl: './student-sing-up.component.html',
  styleUrls: ['./student-sing-up.component.css']
})
export class StudentSingUpComponent {

  formulario: FormGroup
  regExp: RegExp
  emailRegExp: RegExp
  file: any

  constructor(private studentService: StudentsService, private router: Router) {

    this.emailRegExp = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)

    this.regExp = new RegExp(/^(?=.*\d).{4,30}$/)

    this.file = ''
    this.formulario = new FormGroup({

      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      birthdate: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegExp)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.regExp)]),
      repitePassword: new FormControl('', [Validators.required, Validators.pattern(this.regExp)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      image: new FormControl('')

    }, [this.repitePasswordValidator])
  }

  async onSubmit() {
    const formu = this.formulario.value
    formu.type = 'user'
    formu.active = 1
    let fd = new FormData();
    fd.append('avatar', this.file[0]);
    fd.append('name', formu.name)
    fd.append('surname', formu.surname)
    fd.append('birthdate', formu.birthdate)
    fd.append('email', formu.email)
    fd.append('password', formu.password)
    fd.append('phone', formu.phone)
    fd.append('type', formu.type)
    fd.append('active', formu.active)


    const user = await this.studentService.register(fd)
    if (user) {
      this.studentService.sendEmail({
        email: "to@example.com"
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Te has registrado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/login'])
      this.formulario.reset()
    }
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
