import { Component, OnInit } from '@angular/core';
import { ProjectProposition } from '../models/project-proposition.model';
import { ActivatedRoute } from '@angular/router';
import { UIService } from '../services/ui.service';
import { ProjectService } from '../services/project.service';
import { API_URL } from '../utils/API_URLS';
import { DocumentViewerOptions, DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-client-propositions-details',
  templateUrl: './client-propositions-details.page.html',
  styleUrls: ['./client-propositions-details.page.scss'],
})
export class ClientPropositionsDetailsPage implements OnInit {

  projectProposition: ProjectProposition;
  selectedId;
  constructor(
    private activatedRoute: ActivatedRoute,
    private uiService: UIService,
    private document: DocumentViewer,
    private projectService: ProjectService,
    private file: File,
    private transfer: FileTransfer,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      this.selectedId = data.get('id');
      this.getProposition();
    });
  }

  getProposition() {
    this.uiService.startLoading();
    this.projectService.getPropositionsById(this.selectedId)
      .subscribe(data => {
        console.log(data);
        this.uiService.stopLoading();
        this.projectProposition = data.data;
      }, err => {
        this.uiService.stopLoading();
        console.log(err);
      });
  }

  openPDF() {
    const fileURL = API_URL + this.projectProposition.cahier_charge;
    const options: DocumentViewerOptions = {
      title: 'Project Specifications'
    };

    const path = this.file.dataDirectory;
    const transfer = this.transfer.create();
    transfer.download(fileURL, path + 'specs.pdf')
      .then(entry => {
        const url = entry.toURL();
        this.document.viewDocument(url, 'application/pdf', options);

      });


  }

}
