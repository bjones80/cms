import { Component, OnInit, Injectable } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class ContactsComponent implements OnInit {
  selectedContact: Contact;
  constructor() { }

  ngOnInit() {
  }

}
