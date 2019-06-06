import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelected = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts() : Contact[] {
    return this.contacts.slice();
  }


  getContact(index: number): Contact {
    return this.contacts[index];
  }
  getContact2(id: string): Contact{
    return this.contacts[id];
  }

  deleteContact(contact: Contact){
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex(c => c.id === contact.id);

    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
}
}
