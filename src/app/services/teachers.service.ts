
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Teacher } from '../interfaces/teacher.interface';

@Injectable({
  providedIn: 'root'
})

export class TeachersService {
  baseUrl: string

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/teachers'

  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
  }

  getAll(): Promise<Teacher[]> {
    return firstValueFrom(
      this.httpClient.get<Teacher[]>(this.baseUrl)
    )
  }

  getInactive() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/inactive`)
    )
  }

  getById(pId: number): Promise<Teacher> {
    return firstValueFrom(
      this.httpClient.get<Teacher>(`${this.baseUrl}/${pId}`)
    )
  }

  getComents(pId: number): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${pId}/coments`)

    )
  }

  sortByScore(): Promise<Teacher[]> {
    return firstValueFrom(
      this.httpClient.get<Teacher[]>(`${this.baseUrl}/score`)
    )
  }

  getUserPending(): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/request`, this.getHeaders())
    )
  }


  filterTeacherList(pBody: any) {
    return firstValueFrom(
      this.httpClient.post<Teacher[]>(`${this.baseUrl}/filter`, pBody)
    )
  }

  register(pTeacher: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/new`, pTeacher)
    )
  }

  /* Eliminar esta o la de abajo */
  getUserByToken() {

    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/profile`, this.getHeaders())
    )
  }
  profile() {

    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/profile`, this.getHeaders())
    )
  }

  updateStatus(pBody: any) {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/update/status`, pBody)
    )
  }

  newStudent(pBody: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/newStudent`, pBody)
    )
  }

  updateTeacherProfile(pId: number, pBody: any): Promise<any> {
    console.log(pBody)
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/update/${pId}`, pBody)
    )
    
  }
}
