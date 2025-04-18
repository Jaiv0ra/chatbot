import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private builder: FormBuilder,
    private http: HttpClient) { }

  buildForm(){
    return this.builder.group({
      'chat': ['']
    })
  }

  ask(question: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.huggingFaceApiKey}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(
      'https://api-inference.huggingface.co/models/gpt2',
      { inputs: question },
      { headers }
    );
  }
}
