import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  baseUrl: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.baseUrl = 'http://localhost:3000/api/users'

  }

  getAll() {
    return firstValueFrom(
      this.httpClient.get<any>(this.baseUrl)
    )
  }

  getInactive() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/inactive`)
    )
  }

  getStudentByEmail(pBody: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/email`, { email: pBody })
    )
  }


  logIn(pBody: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, pBody)
    )
  }

  changeActivation(pBody: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/activation`, pBody)
    )
  }

  register(pBody: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/new`, pBody)
    )
  }

  createOpinion(pBody: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/opinion`, pBody)
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


}
