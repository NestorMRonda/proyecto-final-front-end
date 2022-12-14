import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;

  constructor(private studentsService: StudentsService) {
    this.formulario = new FormGroup({
      email: new FormControl('pepito@gmail.com', [Validators.required]),
      password: new FormControl('test1234', [Validators.required])
      /* Habría que ver si el email y la password coinciden con la base de datos*/
    })

  }

  async onSubmit() {
    const response = await this.studentsService.logIn(this.formulario.value)
    /* Response es un objeto con success y el token, el token hay que meterlo en el local storage, habría que meter el id en este objeto para hacer posteriormente el navigate en caso de que sea success */
    if (response.success) {
      alert('Enhorabuena')
      /* Meter aquí navigate al perfil del alumno */
    } else {
      alert(response.fatal)
    }
    this.formulario.reset()
  }

  checkError(campo: string, error: string): boolean | undefined {
    return this.formulario.get(campo)?.hasError(error) && this.formulario.get(campo)?.touched
  }
}
