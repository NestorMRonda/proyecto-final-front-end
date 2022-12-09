import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {

    this.baseUrl = 'http://localhost:4200/api/teachers'

  }

  getAll() {
    return this.httpClient.get<Teacher[]>(this.baseUrl).subscribe
  }
}
