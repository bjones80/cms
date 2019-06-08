import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageSelected = new Subject<Message[]>();
  
  messages: Message[] = [];

  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  getMessages(){
    return this.messages.slice();
  }
  addMessage(message: Message){
    this.messages.push(message);
    this.messageSelected.next(this.messages.slice());
  }
}
