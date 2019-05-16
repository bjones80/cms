import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  @Output() messageAdded = new EventEmitter<Message>();

  currentSender: string = "Breena Jones";

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const ingSubject = this.subjectInputRef.nativeElement.value;
    const ingMsgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message(' ', ingSubject, ingMsgText, this.currentSender);
    this.messageAdded.emit(newMessage);
    this.clearMessage();
  }

  onClearMessage() {
    this.clearMessage();
  }

  clearMessage() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }

}
