import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      email: new FormControl('pepito@gmail.com', [Validators.required]),
      password: new FormControl('test1234', [Validators.required])
      /* Habría que ver si el email y la password coinciden con la base de datos*/
    })

  }

  onSubmit() {
    console.log(this.formulario.value)
    this.formulario.reset()
  }

  checkError(campo: string, error: string): boolean | undefined {
    return this.formulario.get(campo)?.hasError(error) && this.formulario.get(campo)?.touched
  }
}
