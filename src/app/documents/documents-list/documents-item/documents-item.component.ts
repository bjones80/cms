import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-documents-item',
  templateUrl: './documents-item.component.html',
  styleUrls: ['./documents-item.component.css']
})
export class DocumentsItemComponent implements OnInit {

  @Input() document: Document;
  @Output() documentSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.documentSelected.emit();
  }

}
