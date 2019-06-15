import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  originalContact: Contact;
  contact: Contact;
  id: string;
  editMode = false;
  // groupContacts: Contact;
  // invalidGroupContact: Contact;

  constructor(private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (!this.id) {
            this.editMode = false;
            return;
          }
          this.originalContact = this.contactService.getContact(this.id);

          if (!this.originalContact) {
            return;
          }
          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));
          
        }
      );
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Contact('', value.name, value.email, value.phone, value.imageUrl, null);
    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contact']);
    // this.editMode = false;
    // form.reset();
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // isInvalidContact(newContact: Contact) {
  //   if (!newContact){
  //     return true;
  //   }
    
  //   if (newContact.id === this.contact.id) {
  //     return true;
  //   }

  //   for (let i = 0; i < this.groupContacts.length; i++) {
  //     if (newContact.id === this.groupContacts[i].id){
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  // addToGroup($event: any) {
  //   let selectedContact: Contact = $event.dragData;
  //   this.invalidGroupContact = this.isInvalidContact(selectedContact);
  //   if (this.invalidGroupContact) {
  //     return;
  //   }
  //   this.groupContacts.push(selectedContact);
  //   this.invalidGroupContact = false;
  // }

}
