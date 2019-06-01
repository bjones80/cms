import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactsDetailComponent } from './contacts/contacts-detail/contacts-detail.component';
import { ContactItemComponent } from './contacts/contact-list/contact-item/contact-item.component';
import { DocumentsListComponent } from './documents/documents-list/documents-list.component';
import { DocumentsDetailComponent } from './documents/documents-detail/documents-detail.component';
import { DocumentsItemComponent } from './documents/documents-list/documents-item/documents-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component'
import { MessagesComponent } from './messages/messages.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { DocumentStartComponent } from './documents/document-start/document-start.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactStartComponent } from './contacts/contact-start/contact-start.component';
import { WinRefService } from './win-ref.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactsDetailComponent,
    ContactItemComponent,
    DocumentsListComponent,
    DocumentsDetailComponent,
    DocumentsItemComponent,
    DocumentsComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    MessagesComponent,
    DropdownDirective,
    ContactEditComponent,
    DocumentStartComponent,
    DocumentEditComponent,
    ContactStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [WinRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
