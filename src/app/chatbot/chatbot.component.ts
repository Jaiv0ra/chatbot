import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ChatbotService, ChatbotTableViewData } from './chatbot.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent implements OnInit,OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  isOpen: boolean = false;

  form: FormGroup = new FormGroup({});
  chatHistoryData: Array<{
    user: 'user' | 'bot';
    message: string | ChatbotTableViewData;
    type: string;
  }> = [];
  isTyping: boolean = false;

  constructor(private service: ChatbotService) {}

  ngOnInit(): void {
    this.buildForm();
    this.togglePopUp();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();

  }

  getResponse(chat: string) {
    this.isTyping = true;
    this.service
      .ask(chat)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res) => {
          console.log("here");
          this.chatHistoryData.push({
            user: 'bot',
            message: res[0].generated_text,
            type: 'text',
          });
          console.log(typeof(res[0].generated_text));
          console.log(this.chatHistoryData);
          this.isTyping = false;
        },
        error: (err: HttpErrorResponse) => {
          this.isTyping = false;
          this.chatHistoryData.push({
            user: 'bot',
            message:
              'Sorry, not available at the moment. Please try again later.',
            type: 'text',
          });
        },
      });
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

  submit() {
    if (this.isTyping) {
      // this.shouldScroll = false;
      return;
    }
    if (this.form.get('chat')!.value.trim()) {
      console.log(this.form.getRawValue());
      // this.shouldScroll = true;
      this.chatHistoryData.push({
        user: 'user',
        message: this.form.get('chat')?.value,
        type: 'text',
      });
      this.getResponse(this.form.get('chat')?.value);
      this.form.get('chat')?.setValue('');
    }
  }
}
