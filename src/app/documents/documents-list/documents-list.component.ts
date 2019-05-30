import { Component, OnInit } from '@angular/core';

import { Document } from '../documents.model'
import { DocumentService } from '../document.service';
@Component({
  selector: 'cms-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  document: Document[];

  constructor(private doucmentService: DocumentService) { }

  ngOnInit() {
    this.document = this.doucmentService.getDocuments();
  }

}
