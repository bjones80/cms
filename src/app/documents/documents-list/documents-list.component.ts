import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from '../documents.model'
@Component({
  selector: 'cms-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  @Output() documentWasSelected = new EventEmitter<Document>();
  document: Document[] = [
    new Document('260'
    , 'CIT 260 - Object Oriented Programming'
    , 'Learn Linux and how to work in that enviorment'
    , 'https://content.byui.edu'
    , null)
    , new Document('366'
    , 'CIT 366 - Full Web Stack Development'
    , 'Learn how to develop modern web applcations using the MEAN stack'
    , 'https://content.byui.edu'
    , null)
    , new Document('425'
    , 'CIT 425 - Data Warehousing'
    , 'talk about databases'
    , 'https://content.byui.edu'
    , null)
    , new Document('460'
    , 'CIT 460 - Enterprise Development'
    , 'you learn really good skills'
    , 'https://content.byui.edu'
    , null)
    , new Document('495'
    , 'CIT 495 - Senior Practicum'
    , 'Prove what you know, do a project'
    , 'https://content.byui.edu'
    , null)
  ];

  constructor() { }

  ngOnInit() {
  }

  onDocumentSelected(document: Document){
    this.documentWasSelected.emit(document)
  }

}
