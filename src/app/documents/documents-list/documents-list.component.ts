import { Component, OnInit } from '@angular/core';

import { Document } from '../documents.model'
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'cms-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  document: Document[];

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.document = this.documentService.getDocuments();
  }

  onNewDocument(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
