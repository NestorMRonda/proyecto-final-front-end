import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-sing-up',
  templateUrl: './teacher-sing-up.component.html',
  styleUrls: ['./teacher-sing-up.component.css']
})
export class TeacherSingUpComponent {
  arrSubjectsDistinct: any[]
  formulario: FormGroup
  regExp: RegExp
  emailRegExp: RegExp
  arrSubjects: any[]

  constructor(private subjectService: SubjectsService, private teacherService: TeachersService) {

    this.emailRegExp = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    this.regExp = new RegExp(/^(?=.*\d).{4,30}$/)

    this.arrSubjects = []
    this.arrSubjectsDistinct = []

    this.formulario = new FormGroup({

      name: new FormControl('', [Validators.required]),
      surname: new FormControl('Agudo', [Validators.required]),
      birthdate: new FormControl(Date, [Validators.required]),
      email: new FormControl('pepito@gmail.com', [Validators.required, Validators.pattern(this.emailRegExp)]),
      password: new FormControl('test1234', [Validators.required, Validators.pattern(this.regExp)]),
      repitePassword: new FormControl('test1234', [Validators.required]),
      phone: new FormControl('655875404', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      subject: new FormControl('Matematicas', [Validators.required]),
      level: new FormControl('ESO', [Validators.required]),
      image: new FormControl(''),
      experience: new FormControl('Haré lo que pueda y más de lo que pueda si es posible y haré lo posible, incluso lo imposible, si es que eso también es posible.'),
      pricehour: new FormControl(14, [Validators.required]),
      address: new FormControl(''),
      remote: new FormControl(false, [Validators.required]),

    }, [this.repitePasswordValidator])
  }

  async ngOnInit() {
    this.arrSubjectsDistinct = await this.subjectService.getSubjectsDistinct();
    this.arrSubjects = await this.subjectService.getAll()
  }

  async onSubmit() {
    const formu = this.formulario.value
    this.formulario.value.active = 1
    this.formulario.value.type = 'teacher'

    const profe = {
      name: formu.name,
      surname: formu.surname,
      birthdate: formu.birthdate,
      email: formu.email,
      password: formu.password,
      phone: formu.phone,
      avatar: formu.image,
      type: formu.type,
      experience: formu.experience,
      pricehour: formu.pricehour,
      address: formu.address,
      active: true,
      remote: formu.remote
    }

    console.log(this.formulario.value)
    await this.teacherService.register(profe)

    /* Sacar el id del teacher por el email */
    const teacherSubject = { user_email: formu.email, subject: formu.subject };
    await this.subjectService.createTeacherSubject(teacherSubject);

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
