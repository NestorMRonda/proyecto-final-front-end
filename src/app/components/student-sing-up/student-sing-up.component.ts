import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

    this.emailRegExp = new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)

    this.regExp = new RegExp(/^[0-9]\d{0,2}$/)


    this.formulario = new FormGroup({

      name: new FormControl('Javie', [Validators.required]),
      surname: new FormControl('Agudo', [Validators.required]),
      birthdate: new FormControl(Date, [Validators.required]),
      email: new FormControl('pepito@gmail.com', [Validators.required, Validators.pattern(this.emailRegExp)]),
      password: new FormControl('test1234', [Validators.required, Validators.pattern(this.regExp)]),
      repitePassword: new FormControl('test1234', [Validators.required, Validators.pattern(this.regExp)]),
      phone: new FormControl('655875404', [Validators.required, Validators.minLength(9)]),
      image: new FormControl('')

    })
  }

  onSubmit() {
    this.formulario.value.type = 'user'
    console.log(this.formulario.value)
    this.formulario.reset()
  }

  checkError(campo: string, error: string): boolean | undefined {
    return this.formulario.get(campo)?.hasError(error) && this.formulario.get(campo)?.touched
  }
}
