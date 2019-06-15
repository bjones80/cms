import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { DocumentService } from '../document.service';
import { Document } from '../documents.model';


@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  id: string;
  editMode = false;

  constructor(private route: ActivatedRoute,
    private documentService: DocumentService,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (!this.id) {
            this.editMode = false;
            return;
          }
          this.originalDocument = this.documentService.getDocument(this.id);

          if (!this.originalDocument) {
            return;
          }

          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      );
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newDocument = new Document('', value.name, value.description, value.url, null);
    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
    // this.editMode = false;
    // form.reset();
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


}
