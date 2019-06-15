import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxId: number;
  currentId: number;
  maxContactId: number;
  contactsListClone: Contact[] = [];
  id: string;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }


  getContact(id: string): Contact {
    for(let i=0; i< this.contacts.length; i++){
      if (this.contacts[i].id === id) {
         return this.contacts[i];
      }
    }
  }
  addContact(newContact: Contact){
    if (newContact === null) {
      return;
    }

    this.maxContactId++;
    newContact.id = window.location.hash = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactChangedEvent.next(this.contacts.slice());
  }

  getMaxId(): number {
    this.contacts.forEach(contact => {
      this.currentId = +contact.id;
      if (this.currentId > this.maxId)
       this.maxId = this.currentId;
    });
    return this.maxId;
  }

  updateContact(originalContact: Contact,  newContact: Contact){
    if (!originalContact || !newContact){
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id)
    if (pos < 0 ){
      return;
    }
    newContact.id = originalContact.id;

    this.contacts[pos] = newContact;
    this.contactsListClone = this.contacts.slice();

    this.contactChangedEvent.next(this.contactsListClone);
  }


  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex(c => c.id === contact.id);

    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }
}
