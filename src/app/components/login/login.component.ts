import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;
  token: string;


  constructor(private studentsService: StudentsService, private router: Router) {
    this.formulario = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
      /* Habría que ver si el email y la password coinciden con la base de datos*/
    })
    this.token = "";

  }

  async onSubmit() {
    const response = await this.studentsService.logIn(this.formulario.value)
    /* Response es un objeto con success y el token, el token hay que meterlo en el local storage, habría que meter el id en este objeto para hacer posteriormente el navigate en caso de que sea success */

    if (response.success) {
      this.token = response.token
      localStorage.setItem('token', this.token)

      localStorage.setItem('type', response.type)

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El login ha sido correcto',
        showConfirmButton: false,
        timer: 1500
      })
      const user = await this.studentsService.getStudentByEmail(this.formulario.value.email)
      if (user.type === "user") {
        this.router.navigate([`/profile/students/profile/${user.id}`])
      }
      if (user.type === "teacher") {
        this.router.navigate([`/profile/teacher/profile/${user.id}`])
      }
      /* if (user.type === "admin"){
        this.router.navigate([`/profile/admin/profile/${user.id}`])
      } */



    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El usuario o contraseña es incorrecto',
        showConfirmButton: false,
        timer: 1500
      })
    }
    this.formulario.reset()
  }

  checkError(campo: string, error: string): boolean | undefined {
    return this.formulario.get(campo)?.hasError(error) && this.formulario.get(campo)?.touched
  }
}
