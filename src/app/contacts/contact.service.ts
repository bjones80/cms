import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { stringify } from '@angular/core/src/util';

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

  constructor(private http: HttpClient) {
    this.maxId = this.getMaxId();
  }
  storeContacts(contacts: Contact[]) {
    let json = JSON.stringify(contacts);
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('http://localhost:3000/contacts', json, { headers: header })
      .subscribe((response: Response) => {
        this.contactChangedEvent.next(contacts.slice());
      });
  }

  getContacts() {
    this.http.get<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts')
      .subscribe(
        (responseData) => {
          this.contacts = responseData.contacts;
          this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
          this.contactChangedEvent.next(this.contacts.slice());
        }
      );
  }


  getContact(id: string): Contact {
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].id === id) {
        return this.contacts[i];
      }
    }
  }
  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    contact.id = '';
    const strContact = JSON.stringify(contact);

    this.http.post('http://localhost:3000/contacts', strContact, { headers: headers })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactChangedEvent.next(this.contacts.slice());
        }
      )
  }

  getMaxId(): number {
    this.contacts.forEach(contact => {
      this.currentId = +contact.id;
      if (this.currentId > this.maxId)
        this.maxId = this.currentId;
    });
    return this.maxId;
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === originalContact.id)
    if (pos < 0) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    //const strContact = JSON.stringify(newContact);
    //TODO: call .post method
    this.http.put('http://localhost:3000/contacts/' + originalContact.id
      , newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.contactChangedEvent.next(this.contacts.slice());
        });
  }


  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    // const pos = this.contacts.findIndex(c => c.id === contact.id);

    // if (pos < 0) {
    //   return;
    // }
    // TODO: call node service using .delete method of http
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactChangedEvent.next(this.contacts.slice());
        }
      )
  }
}
