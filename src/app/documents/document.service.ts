import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subscriber, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxId: number;
  currentId: number;
  maxDocumentId: number;
  documentsListClone: Document[] = [];
  id: string;


  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxId = this.getMaxId();
   }

   getDocuments() : Document[] {
     return this.documents.slice();
   }
   
   getDocument(id: string) : Document{
     for(let i=0; i< this.documents.length; i++){
       if (this.documents[i].id === id) {
          return this.documents[i];
       }
     }
    //  this.documents.forEach(
    //    document => {
    //      if (document.id === id) {
    //        return document;
    //      }
    //    }
    //  );

    //  return null;
   }

   addDocument(newDocument: Document){
     if (newDocument === null) {
       return;
     }

     this.maxDocumentId++;
     newDocument.id = window.location.hash = this.maxDocumentId.toString();
     this.documents.push(newDocument);
     this.documentChangedEvent.next(this.documents.slice());
   }

   getMaxId(): number {
     this.documents.forEach(document => {
       this.currentId = +document.id;
       if (this.currentId > this.maxId)
        this.maxId = this.currentId;
     });
     return this.maxId;
   }

   updateDocument(originalDocmument: Document,  newDocument: Document){
     if (!originalDocmument || !newDocument){
       return;
     }

     const pos = this.documents.findIndex(d => d.id === originalDocmument.id)
     if (pos < 0 ){
       return;
     }
     newDocument.id = originalDocmument.id;

     this.documents[pos] = newDocument;
     this.documentsListClone = this.documents.slice();

     this.documentChangedEvent.next(this.documentsListClone);
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
     this.documentChangedEvent.next(this.documents.slice());
    //  .subscribe(
    //    (response: Response) => {
    //      this.documents.splice(pos, 1)
    //    }
    //  );
   }
   
}
