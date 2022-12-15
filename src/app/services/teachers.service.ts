
import { HttpClient } from '@angular/common/http';
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

  getAll(): Promise<Teacher[]> {
    return firstValueFrom(
      this.httpClient.get<Teacher[]>(this.baseUrl)
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
}
