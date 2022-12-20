import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { MessagesService } from 'src/app/services/messages.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  /*   @ViewChild('divChat') divChat!: ElementRef; */

  userId: number
  arrChat: any[]
  mensaje: string
  teacherId: number
  teacher: any
  constructor(private messagesService: MessagesService, private teacherService: TeachersService, private activatedRoute: ActivatedRoute) {
    this.mensaje = ''
    this.arrChat = []
    this.userId = 0
    this.teacherId = 0
    this.teacher = {}

  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.teacherId = params['teacherId']
      this.teacher = await this.teacherService.getById(this.teacherId)

    })



    this.arrChat = await this.messagesService.getMessages({ user_id: 30, teacher_id: 31 })
    const { id } = await this.teacherService.getUserByToken()
    this.userId = id /* Usar cunado alex acabe lo de alumnos */

    if (this.teacher.avatar !== "undefined") { this.teacher.avatar = `http://localhost:3000/images/${this.teacher.avatar}` }
    else {
      this.teacher.avatar = "../../assets/images/Teacher_icon.png"
    }

    /*  this.divChat.nativeElement.scrollTop = this.divChat.nativeElement.scrollHeight */
  }

  onKeyPress($event: any): void {
    console.log($event.target)
  }

  async onClick() {
    await this.messagesService.sendMessages({
      user_id: 30, /* Cambiar estos id por los correspondientes- this.userId */
      teacher_id: this.teacherId, /* cambiar id por el de la url */
      message: this.mensaje
    })
    this.arrChat = await this.messagesService.getMessages({ user_id: 30, teacher_id: 31 })
    this.mensaje = ''
  }

}
