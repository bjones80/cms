import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageChangeEvent = new Subject<Message[]>();
  
  messages: Message[] = [];

  constructor(private http: HttpClient) { 
    this.messages = MOCKMESSAGES;
  }

  storeMessages(messages: Message[]){
    let json = JSON.stringify(messages);
    let header = new HttpHeaders({'Content-Type': 'application/json' });
    this.http.put('https://cms-project-33f07.firebaseio.com/messages.json', json, { headers: header})
      .subscribe((response: Response)=> {
        this.messageChangeEvent.next(messages.slice());
      });
  }

  getMessages(){
    this.http.get<Message[]>('https://cms-project-33f07.firebaseio.com/messages.json')
    .subscribe(
      (messages) => {
        this.messages = messages;
        this.messages.sort((a, b) => a.subject > b.subject ? 1 : b.subject > a.subject ? -1 : 0);
        this.messageChangeEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  addMessage(message: Message){
    this.messages.push(message);
    this.messageChangeEvent.next(this.messages.slice());
    let messagesListClone = this.messages.slice();
    this.storeMessages(messagesListClone);
  }
}
