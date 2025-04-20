import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { HFResponse } from './chatbot.type';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  constructor(private builder: FormBuilder, private http: HttpClient) {}

  buildForm() {
    return this.builder.group({
      chat: [''],
    });
  }

  ask(question: string):Observable<HFResponse[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.huggingFaceApiKey}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<HFResponse[]>(
      'https://api-inference.huggingface.co/models/gpt2',
      { inputs: question },
      { headers }
    );
  }
}

export class ChatbotTableViewData {
  constructor() {}
  columns: string[] = [];
  values: string[][] = [];
}
