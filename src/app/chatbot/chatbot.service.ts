import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  buildCreateForm() {
    return this.builder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      contentType: ['application/json', Validators.required],
      apiUrl: ['application/json', Validators.required],
      authorization: ['application/json', Validators.required],
      isFree: [false],
    });
  }

  ask(question: string): Observable<HFResponse[]> {
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
