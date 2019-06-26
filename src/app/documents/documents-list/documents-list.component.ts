import { Component, OnInit, OnDestroy } from '@angular/core';

import { Document } from '../documents.model'
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'cms-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  documents: Document[] = [];
  documentId: string = '';


  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.getDocuments();
    this.subscription = this.documentService.documentChangedEvent
      .subscribe(
        (document: Document[]) => {
          this.documents = document;
        }
      );
    this.documentService.getDocuments();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
