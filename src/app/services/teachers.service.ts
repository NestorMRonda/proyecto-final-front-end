
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TeachersService {
  baseUrl: string

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/teachers'

  }

  getAll() {
    return firstValueFrom(
      this.httpClient.get<any>(this.baseUrl)
    )
  }

  getById(pId: number) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${pId}`)
    )
  }
}
