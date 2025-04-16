import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate([])
  }
}
