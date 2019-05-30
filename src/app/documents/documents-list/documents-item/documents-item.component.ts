import { Component, OnInit, Input } from '@angular/core';
import { DocumentService } from '../../document.service';
import { Document } from '../../documents.model';

@Component({
  selector: 'cms-documents-item',
  templateUrl: './documents-item.component.html',
  styleUrls: ['./documents-item.component.css']
})
export class DocumentsItemComponent implements OnInit {

  @Input() document: Document;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
  }

  onSelected() {
    this.documentService.documentSelected.emit(this.document);
  }

}
