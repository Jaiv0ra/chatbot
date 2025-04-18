import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ChatbotService } from './chatbot.service';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  isOpen: boolean = false;

  form: FormGroup = new FormGroup({});;

  constructor(private service: ChatbotService) {}

  ngOnInit(): void {
    this.buildForm();
    this.togglePopUp();
  }

  buildForm() {
    this.form = this.service.buildForm();
  }

  togglePopUp() {
    this.isOpen = !this.isOpen;
    const popUpElement = document.getElementById('chatbotPopUp');
    const buttonElement = document.getElementById('chatbotButton');
    if (this.isOpen) {
      popUpElement?.classList.add('open');
      buttonElement?.classList.add('hidden');
    } else {
      popUpElement?.classList.remove('open');
      buttonElement?.classList.remove('hidden');
    }
  }

  submit(){
    if(this.form.get('chat')!.value.trim()){
      console.log(this.form.getRawValue());
      this.service.ask(this.form.get('chat')!.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
        console.log(res, 'res');
      })
    }
  }
}
