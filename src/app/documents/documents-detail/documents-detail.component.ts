import { Component, OnInit } from '@angular/core';

import { Document } from '../documents.model'
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';
@Component({
  selector: 'cms-documents-detail',
  templateUrl: './documents-detail.component.html',
  styleUrls: ['./documents-detail.component.css']
})
export class DocumentsDetailComponent implements OnInit {
  document: Document;
  id: number;
  nativeWindow: any;

  constructor(private documentService: DocumentService,
    private windowRefService: WinRefService,
    private route: ActivatedRoute,
    private router: Router) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.document = this.documentService.getDocument(this.id);
        }
      );
  }

  onEditDocument() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onView() {
    if (this.document.url){
      this.nativeWindow.open(this.document.url);
    }
  }

}
