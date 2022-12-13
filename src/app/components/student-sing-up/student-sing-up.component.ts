import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-sing-up',
  templateUrl: './student-sing-up.component.html',
  styleUrls: ['./student-sing-up.component.css']
})
export class StudentSingUpComponent {

  formulario: FormGroup
  regExp: RegExp
  emailRegExp: RegExp

  constructor() {

    this.emailRegExp = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)

    this.regExp = new RegExp(/^(?=.*\d).{4,30}$/)


    this.formulario = new FormGroup({

      name: new FormControl('', [Validators.required]),
      surname: new FormControl('Agudo', [Validators.required]),
      birthdate: new FormControl(Date, [Validators.required]),
      email: new FormControl('pepito@gmail.com', [Validators.required, Validators.pattern(this.emailRegExp)]),
      password: new FormControl('test1234', [Validators.required, Validators.pattern(this.regExp)]),
      repitePassword: new FormControl('test1234', [Validators.required, Validators.pattern(this.regExp)]),
      phone: new FormControl('655875404', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      image: new FormControl('')

    }, [this.repitePasswordValidator])
  }

  onSubmit() {
    this.formulario.value.type = 'user'
    console.log(this.formulario.value)
    this.formulario.reset()
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
}
