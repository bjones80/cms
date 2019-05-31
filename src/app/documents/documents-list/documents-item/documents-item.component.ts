import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../../documents.model';

@Component({
  selector: 'cms-documents-item',
  templateUrl: './documents-item.component.html',
  styleUrls: ['./documents-item.component.css']
})
export class DocumentsItemComponent implements OnInit {

  @Input() document: Document;
  @Input() index: number;

  ngOnInit() {
  }

}
