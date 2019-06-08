import { Component, OnInit, Injectable } from '@angular/core';
import { Document } from './documents.model'
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

  constructor() { }

  ngOnInit() {
  }

}
