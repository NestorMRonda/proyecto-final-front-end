import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-student-opinion',
  templateUrl: './student-opinion.component.html',
  styleUrls: ['./student-opinion.component.css']
})
export class StudentOpinionComponent {
  formulario: FormGroup

  constructor(private studentService: StudentsService, private router: Router) {
    this.formulario = new FormGroup({
      opinion: new FormControl('Me lo he pasado chachi', [Validators.required]),
      score: new FormControl(8, [Validators.required])
    })
  }

  async onSubmit(): Promise<void> {

    let user_has_teacherId = 4; //cambiar por id de user_has_teacher
    await this.studentService.createOpinion({ id: user_has_teacherId, opinion: this.formulario.value.opinion, score: this.formulario.value.score })
    /* Para terminar el navigate es necesario  recuperar el user_id de user_has_teacher y eso no se puede hacer hasta que no se haya creado una conexión previa entre user y teacher*/
    /*     this.router.navigate(['profile/students/profile', 90]) */
    //Meterle un navigate
  }

  checkError(campo: string, error: string): boolean | undefined {
    return this.formulario.get(campo)?.hasError(error) && this.formulario.get(campo)?.touched
  }

}
