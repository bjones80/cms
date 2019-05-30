import { Component, OnInit, Injectable } from '@angular/core';
import { Document } from './documents.model'
import { DocumentService } from './document.service';
@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})

@Injectable({
  providedIn: 'root',
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.documentSelected
    .subscribe(
      (document: Document) => {
        this.selectedDocument = document
      }
    );
  }

}
