import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
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


  constructor(private http: HttpClient) {
    this.maxId = this.getMaxId();
  }

  storeDocuments(documents: Document[]) {
    let json = JSON.stringify(documents);
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('http://localhost:3000/documents', json, { headers: header })
      .subscribe((response: Response) => {
        this.documentChangedEvent.next(documents.slice());
      });
  }
  getDocuments() {
    this.http.get<{ message: string, documents: Document[] }>('http://localhost:3000/documents')
      .subscribe(
        (responseData) => {
          this.documents = responseData.documents;
          this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
          this.documentChangedEvent.next(this.documents.slice());
        }
      );
  }

  getDocument(id: string): Document {
    for (let i = 0; i < this.documents.length; i++) {
      if (this.documents[i].id === id) {
        return this.documents[i];
      }
    }
  }

  addDocument(document: Document) {

    if (!document) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    document.id = '';
    const strDocument = JSON.stringify(document);

    this.http.post('http://localhost:3000/documents', strDocument, { headers: headers })
      .subscribe(
        (documents: Document) => {
          this.documents.push(document);
          this.documentChangedEvent.next(this.documents.slice());
        }
      )
  }

  getMaxId(): number {
    this.documents.forEach(document => {
      this.currentId = +document.id;
      if (this.currentId > this.maxId)
        this.maxId = this.currentId;
    });
    return this.maxId;
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(c => c.id === originalDocument.id)
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    //const strDocument = JSON.stringify(newDocument);

    this.http.put('http://localhost:3000/documents/' + originalDocument.id
      , newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.documentChangedEvent.next(this.documents.slice());
        });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentChangedEvent.next(this.documents.slice());
        }
      )
  }

}
