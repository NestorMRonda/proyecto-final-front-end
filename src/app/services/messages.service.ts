import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/messages'
  }

  getMessages(pBody: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}`, pBody)
    )
  }

  sendMessages(pBody: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/new`, pBody)
    )
  }


}
