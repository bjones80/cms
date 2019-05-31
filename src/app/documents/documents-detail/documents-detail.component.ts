import { Component, OnInit } from '@angular/core';

import { Document } from '../documents.model'
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'cms-documents-detail',
  templateUrl: './documents-detail.component.html',
  styleUrls: ['./documents-detail.component.css']
})
export class DocumentsDetailComponent implements OnInit {
  document: Document;
  id: number;

  constructor(private documentService: DocumentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.document = this.documentService.getDocument(this.id);
        }
      );
  }
  
  onEditDocument(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
