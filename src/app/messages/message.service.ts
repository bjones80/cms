import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { stringify } from '@angular/core/src/util';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageChangeEvent = new Subject<Message[]>();
  
  messages: Message[] = [];
  maxId: number;
  maxMessageId: number;
  currentId: number;
  messagesListClone: Message[]=[];
  id: string;

  constructor(private http: HttpClient) { 
    this.maxId = this.getMaxId();
    //this.messages = MOCKMESSAGES;
  }

  storeMessages(messages: Message[]){
    let json = JSON.stringify(messages);
    let header = new HttpHeaders({'Content-Type': 'application/json' });
    this.http.put('http://localhost:3000/messages', json, { headers: header})
      .subscribe((response: Response)=> {
        this.messageChangeEvent.next(messages.slice());
      });
  }

  getMessages(){
    this.http.get<{ message: string, messages: Message[] }>('http://localhost:3000/messages')
    .subscribe(
      (responseData) => {
        this.messages = responseData.messages;
        this.messages.sort((a, b) => a.subject > b.subject ? 1 : b.subject > a.subject ? -1 : 0);
        this.messageChangeEvent.next(this.messages.slice());
      }
    );
  }

  getMaxId(): number {
    this.messages.forEach(message => {
      this.currentId = +message.id;
      if (this.currentId > this.maxId)
      this.maxId = this.currentId;
    });
    return this.maxId;
  }

  addMessage(message: Message){

    if (!message) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    message.id = '';
    const strMessage = JSON.stringify(message);
    this.http.post('http://localhost:3000/messages', strMessage, {headers: headers})
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.messageChangeEvent.next(this.messages.slice());
      }
    )
  }
}
