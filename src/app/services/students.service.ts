import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Student } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  baseUrl: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.baseUrl = 'http://localhost:3000/api/users'


  }
  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
  }

  getAll() {
    return firstValueFrom(
      this.httpClient.get<any>(this.baseUrl)
    )
  }

  getById(pId: number): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${pId}`)
    )
  }
  getUserById(pId: number): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/usuario/${pId}`)
    )
  }

  getInactive(): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/inactive`)
    )
  }

  getStudentByEmail(pBody: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/email`, { email: pBody })
    )
  }

  getComents(pId: number): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${pId}/coments`)
    )
  }


  logIn(pBody: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, pBody)
    )
  }

  changeActivation(pBody: any): Promise<any> {

    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/activation`, pBody, this.getHeaders())
    )
  }

  register(pBody: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/new`, pBody)
    )
  }

  createOpinion(pBody: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/opinion`, pBody, this.getHeaders())
    )
  }

  updateStudentProfile(pId: number, pBody: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/update/${pId}`, pBody)
    )
  }


  isLogged(): boolean {
    return (localStorage.getItem('token')) ? true : false;
  }

  Logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
    }

    if (localStorage.getItem('type')) {
      localStorage.removeItem('type')
    }
    this.router.navigate(['/login'])
  }

  isType(pType: string): boolean {
    return (localStorage.getItem('type') === pType) ? true : false;
  }

  isTypeAdmin(pType: string): boolean {
    return (localStorage.getItem('type') === pType || localStorage.getItem('type') === "admin") ? true : false;
  }

  getTeachersByStudent(pId: number) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${pId}/teachers`)
    )
  }

  getUserByToken() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/profile`, this.getHeaders())
    )
  }

  sendEmail(pBody: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`http://localhost:3000/email`, pBody)
    )
  }


}
