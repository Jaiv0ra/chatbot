import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatbotService } from '../chatbot.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot-crud',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chatbot-crud.component.html',
  styleUrl: './chatbot-crud.component.css'
})
export class ChatbotCrudComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  constructor(private service: ChatbotService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.service.buildCreateForm()
  }
}
