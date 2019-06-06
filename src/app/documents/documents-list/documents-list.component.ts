import { Component, OnInit } from '@angular/core';

import { Document } from '../documents.model'
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'cms-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  subscription: Subscription;
  documents: Document[];
s
  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    
    this.documentService.documentChangedEvent
      .subscribe(
        (documentList: Document[]) => {
          this.documents = documentList;
        }
      );
  }

  onNewDocument(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
