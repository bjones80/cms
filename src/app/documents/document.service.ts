import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documentSelected = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  documents: Document[] = [];


  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

   getDocuments() {
     return this.documents.slice();
   }
   
   getDocument(index: number){
     return this.documents[index];
   }

   deleteDocument(document: Document){
     if (!document) {
       return;
     }
     const pos = this.documents.findIndex(d => d.id === document.id);

     if (pos < 0) {
       return;
     }
     this.documents.splice(pos, 1);
     this.documentChangedEvent.emit(this.documents.slice());
    //  .subscribe(
    //    (response: Response) => {
    //      this.documents.splice(pos, 1)
    //    }
    //  );
   }
   
}
