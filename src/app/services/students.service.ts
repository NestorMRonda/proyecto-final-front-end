import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Student } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/users'

  }


  logIn(pBody: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, pBody)
    )
  }

  register(pBody: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/new`, pBody)
    )
  }

  getStudentByEmail(pBody: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/email`, { email: pBody })
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
  }

  isType(pType: string): boolean {
    return (localStorage.getItem('type') === pType) ? true : false;
  }


}
