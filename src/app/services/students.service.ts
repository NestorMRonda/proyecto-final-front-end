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


  logIn(pBody: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, pBody)
    )
  }


}
