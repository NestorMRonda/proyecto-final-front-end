import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TeachersService } from 'src/app/services/teachers.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-teacher-detail-editprofile',
  templateUrl: './teacher-detail-editprofile.component.html',
  styleUrls: ['./teacher-detail-editprofile.component.css']
})
export class TeacherDetailEditprofileComponent {

  arrSubjectsDistinct: any[]
  formulario: FormGroup
  regExp: RegExp
  emailRegExp: RegExp
  arrSubjects: any[]
  file;
  teacher: any

  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  constructor(private subjectService: SubjectsService, private teacherService: TeachersService, private router: Router)
  {
  this.emailRegExp = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
  this.regExp = new RegExp(/^(?=.*\d).{4,30}$/)

  this.arrSubjects = []
  this.arrSubjectsDistinct = []

  this.formulario = new FormGroup({

    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    birthdate: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.pattern(this.emailRegExp)]),
    password: new FormControl('',[Validators.required, Validators.pattern(this.regExp)]),
    repitePassword: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    subject: new FormControl('',[Validators.required]),
    level: new FormControl('',[Validators.required]),
    experience: new FormControl('',),
    pricehour: new FormControl('',[Validators.required]),
    address: new FormControl('',),
    remote: new FormControl('',[Validators.required]),

  }, [this.repitePasswordValidator])

  this.file="";
}

async ngOnInit() {
  this.arrSubjectsDistinct = await this.subjectService.getSubjectsDistinct();
  this.arrSubjects = await this.subjectService.getAll()
  /* this.teacher = await this.teacherService.getById() */
  this.teacher = "";
  /**
   * pillar el profile haciendo un GET http://localhost:3000/api/teachers/profile con el token en el body, este nos devuelve un objeto user
     Poner los valores del objeto en el value del formulario de cada input correspondiente
     Hacer PUT http://localhost:3000/api/teachers/Id y en el body todo lo que seria el objeto user
   */

}

ngAfterViewInit() {
  //Haremos que se cargue aquí el mapa ya que este método se ejecuta cuando ya se ha cargado todo el componente, algo imprescindible para los mapas.
  this.loadAutocomplete()
}

async onSubmit() {
  const formu = this.formulario.value;
  formu.active = 1;
  formu.type = 'teacher';
  formu.address = this.inputPlaces.nativeElement.value //Mete el valor del autocomplete en el formu.address para pasarselo a la base de datos.


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

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Te has registrado correctamente',
    showConfirmButton: false,
    timer: 1500
  })

  this.router.navigate([`/home`])

}

loadAutocomplete() {
  //Al trabajar con ViewChild al poner el inputPlaces para capturar el elemento propio necesitamos la propiedad nativeElement, y ahora si le podemos poner el .value.....

  const autocomplete = new google.maps.places.Autocomplete(this.inputPlaces.nativeElement,)

  
  
  
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
