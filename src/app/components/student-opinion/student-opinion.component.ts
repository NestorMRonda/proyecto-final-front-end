import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-student-opinion',
  templateUrl: './student-opinion.component.html',
  styleUrls: ['./student-opinion.component.css']
})
export class StudentOpinionComponent {
  formulario: FormGroup
  teacherId: number
  userId: number
  constructor(private studentService: StudentsService, private router: Router, private activatedRoute: ActivatedRoute, private teacherService: TeachersService) {
    this.teacherId = 0
    this.userId = 0
    this.formulario = new FormGroup({
      opinion: new FormControl('Me lo he pasado chachi', [Validators.required]),
      score: new FormControl(8, [Validators.required])
    })
  }

  async ngOnInit() {
    const { id } = await this.teacherService.getUserByToken()
    this.userId = id
    this.activatedRoute.params.subscribe(async (params) => {
      this.teacherId = params['teacherId']
    })
  }

  async onSubmit(): Promise<void> {
    /* Cambiar el user_id por this.userId cuando este todo listo */
    await this.studentService.createOpinion({ user_id: this.userId, teacher_id: this.teacherId, opinion: this.formulario.value.opinion, score: this.formulario.value.score })

    this.router.navigate(['profile/students/profile', this.userId])
    //Meterle un navigate
  }

  checkError(campo: string, error: string): boolean | undefined {
    return this.formulario.get(campo)?.hasError(error) && this.formulario.get(campo)?.touched
  }

}
