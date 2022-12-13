import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Subject } from '../interfaces/subject.interface';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  baseUrl: string
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/subjects';
  }

  getAll(): Promise<Subject[]> {
    return firstValueFrom(
      this.httpClient.get<Subject[]>(this.baseUrl)
    )
  }

  getSubjectsDistinct(): Promise<Subject[]> {
    return firstValueFrom(
      this.httpClient.get<Subject[]>(`${this.baseUrl}/distinct`)
    )
  }
}
