import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactsDetailComponent } from './contacts/contacts-detail/contacts-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentStartComponent } from './documents/document-start/document-start.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentsDetailComponent } from './documents/documents-detail/documents-detail.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/documents', pathMatch: 'full' },
    {path: 'documents', component: DocumentsComponent, children:[
        {path: '', component: DocumentStartComponent},
        {path: 'new', component: DocumentEditComponent},
        {path: ':id', component: DocumentsDetailComponent },
        {path: ':id/edit', component: DocumentEditComponent} 
    ]},
    { path: 'contacts', component: ContactsComponent, children: [ 
        {path: 'new', component: ContactEditComponent},
        {path: ':id', component: ContactsDetailComponent},
        {path: ':id/edit', component: ContactEditComponent}
    ]},
    {path: 'messages', component: MessagesComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}