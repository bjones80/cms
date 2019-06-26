import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
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

  constructor(private http: HttpClient) {
    //this.contacts = MOCKCONTACTS;
    this.maxId = this.getMaxId();
  }
  storeContacts(contacts: Contact[]){
    let json = JSON.stringify(contacts);
    let header = new HttpHeaders({'Content-Type': 'application/json' });
    this.http.put('https://cms-project-33f07.firebaseio.com/contacts.json', json, { headers: header})
      .subscribe((response: Response)=> {
        this.contactChangedEvent.next(contacts.slice());
      });
  }

  getContacts() {
    this.http.get<Contact[]>('https://cms-project-33f07.firebaseio.com/contacts.json')
    .subscribe(
      (contacts) => {
        this.contacts = contacts;
        this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
        this.contactChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
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
    let contactsListClone = this.contacts.slice();
    this.storeContacts(contactsListClone);
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

    let contactsListClone = this.contacts.slice();
    this.storeContacts(contactsListClone);
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
    let contactsListClone = this.contacts.slice();
    this.storeContacts(contactsListClone);
  }
}
