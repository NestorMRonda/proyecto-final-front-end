import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { MessagesService } from 'src/app/services/messages.service';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  /*   @ViewChild('divChat') divChat!: ElementRef;
   */
  userId: number
  arrChat: any[]
  mensaje: string
  teacherId: number
  teacher: any
  constructor(private messagesService: MessagesService, private teacherService: TeachersService, private activatedRoute: ActivatedRoute, private studentService: StudentsService) {
    this.mensaje = ''
    this.arrChat = []
    this.userId = 0
    this.teacherId = 0
    this.teacher = {}

  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.teacherId = params['teacherId']
      console.log(this.teacherId)
      this.teacher = await this.studentService.getUserById(this.teacherId)
      console.log(this.teacher)
    })


    const { id } = await this.teacherService.getUserByToken()
    this.userId = id
    this.arrChat = await this.messagesService.getMessages({ user_id: this.userId, teacher_id: this.teacherId })
    console.log(this.arrChat)

    if (this.teacher.avatar !== "undefined") { this.teacher.avatar = `http://localhost:3000/images/${this.teacher.avatar}` }
    else {
      this.teacher.avatar = "../../assets/images/Teacher_icon.png"
    }


  }

  async onClick() {
    await this.messagesService.sendMessages({
      user_id: this.userId, /* Cambiar estos id por los correspondientes- this.userId */
      teacher_id: this.teacherId, /* cambiar id por el de la url */
      message: this.mensaje
    })
    this.arrChat = await this.messagesService.getMessages({ user_id: this.userId, teacher_id: this.teacherId })
    /* Cambiar estos dos por this.userId y this.teacherId */
    this.mensaje = ''
    /*   this.divChat.nativeElement.scrollTop = this.divChat.nativeElement.scrollHeight */
  }

}
