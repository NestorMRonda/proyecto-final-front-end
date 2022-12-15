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
  file: any

  constructor(private subjectService: SubjectsService, private teacherService: TeachersService) {
    this.emailRegExp = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    this.regExp = new RegExp(/^(?=.*\d).{4,30}$/)

    this.arrSubjects = []
    this.arrSubjectsDistinct = []

    this.formulario = new FormGroup({

      name: new FormControl('', [Validators.required]),
      surname: new FormControl('Agudo', [Validators.required]),
      birthdate: new FormControl(null, [Validators.required]),
      email: new FormControl('pepito@gmail.com', [Validators.required, Validators.pattern(this.emailRegExp)]),
      password: new FormControl('test1234', [Validators.required, Validators.pattern(this.regExp)]),
      repitePassword: new FormControl('test1234', [Validators.required]),
      phone: new FormControl('655875404', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      subject: new FormControl('Matematicas', [Validators.required]),
      level: new FormControl('ESO', [Validators.required]),
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
    const formu = this.formulario.value;
    formu.active = 1;
    formu.type = 'teacher';

    let fd = new FormData();
    fd.append('avatar', this.file[0]);
    fd.append('name', formu.name)
    fd.append('surname', formu.surname)
    fd.append('birthdate', formu.birthdate)
    fd.append('email', formu.email)
    fd.append('password', formu.password)
    fd.append('phone', formu.phone)
    fd.append('type', formu.type)
    fd.append('experience', formu.experience)
    fd.append('pricehour', formu.pricehour)
    fd.append('address', formu.address)
    fd.append('active', "1")
    fd.append('remote', formu.remote)

    /*     const profe = {
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
        } */

    await this.teacherService.register(fd)

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

  onChange($event: any) {
    this.file = $event.target.files
  }
}
