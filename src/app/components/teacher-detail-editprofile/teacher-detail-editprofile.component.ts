import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TeachersService } from 'src/app/services/teachers.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-teacher-detail-editprofile',
  templateUrl: './teacher-detail-editprofile.component.html',
  styleUrls: ['./teacher-detail-editprofile.component.css']
})
export class TeacherDetailEditprofileComponent {
  
  formulario: FormGroup
  regExp: RegExp
  emailRegExp: RegExp
  file: any
  defaultTeacher: any
  arrSubjects: any[]
  arrSubjectsDistinct: any[]

  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  constructor(private subjectService: SubjectsService, private teacherService: TeachersService, private router: Router)
  {
    this.emailRegExp = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    this.regExp = new RegExp(/^(?=.*\d).{4,30}$/)
    this.file = ''

    this.formulario = new FormGroup({

      name: new FormControl('', [Validators.required]),
      surname: new FormControl('Agudo', [Validators.required]),
      birthdate: new FormControl(null, [Validators.required]),
      email: new FormControl('pepito@gmail.com', [Validators.required, Validators.pattern(this.emailRegExp)]),
      phone: new FormControl('655875404', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      /* subject: new FormControl(null, [Validators.required]),
      level: new FormControl(null, [Validators.required]), */
      experience: new FormControl('Haré lo que pueda y más de lo que pueda si es posible y haré lo posible, incluso lo imposible, si es que eso también es posible.'),
      pricehour: new FormControl(14, [Validators.required]),
      address: new FormControl(''),
      remote: new FormControl(false, [Validators.required])

    })
    this.arrSubjects = []
    this.arrSubjectsDistinct = []
  }

  async ngOnInit() {
    /* this.arrSubjectsDistinct = await this.subjectService.getSubjectsDistinct();
    this.arrSubjects = await this.subjectService.getAll() */

    this.defaultTeacher = await this.teacherService.getUserByToken()
    this.formulario.get('name')?.setValue(this.defaultTeacher.name)
    this.formulario.get('surname')?.setValue(this.defaultTeacher.surname)
    this.formulario.get('email')?.setValue(this.defaultTeacher.email)
    this.formulario.get('phone')?.setValue(this.defaultTeacher.phone)
    this.formulario.get('birthdate')?.setValue(dayjs(this.defaultTeacher.birthdate).format('YYYY-MM-DD'))
    this.formulario.get('experience')?.setValue(this.defaultTeacher.experience)
    this.formulario.get('pricehour')?.setValue(this.defaultTeacher.pricehour)
    this.formulario.get('address')?.setValue(this.defaultTeacher.address)
    this.formulario.get('remote')?.setValue(this.defaultTeacher.remote)

  }

  async onSubmit() {
    const formu = this.formulario.value

    let fd = new FormData();
    if (this.file[0]) fd.append('avatar', this.file[0]);
    fd.append('name', formu.name)
    fd.append('surname', formu.surname)
    fd.append('birthdate', formu.birthdate)
    fd.append('email', formu.email)
    fd.append('phone', formu.phone)
    fd.append('experience', formu.experience)
    fd.append('pricehour', formu.pricehour)
    fd.append('address', formu.address)
    fd.append('remote', formu.remote)
    
    /* El id debería ser de defaultteacher.id,  */
    const user = await this.teacherService.updateTeacherProfile(this.defaultTeacher.id, fd)

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Perfil actualizado con éxito',
      showConfirmButton: false,
      timer: 1500
    })

    this.router.navigate(['/profile/teacher/profile', this.defaultTeacher.id])
  }

  checkError(campo: string, error: string): boolean | undefined {
    return this.formulario.get(campo)?.hasError(error) && this.formulario.get(campo)?.touched
  }


  onChange($event: any) {
    this.file = $event.target.files
  }
  
}
