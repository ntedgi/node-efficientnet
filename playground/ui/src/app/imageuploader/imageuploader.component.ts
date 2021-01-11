import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-imageuploader',
  templateUrl: './imageuploader.component.html',
  styleUrls: ['./imageuploader.component.scss'],
  providers: [MessageService, HttpClient]

})
export class ImageuploaderComponent implements OnInit {

  constructor(private messageService: MessageService) {}
  uploadedFiles: any[] = [];

  ngOnInit(): void {
  }
  onUpload(event) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

}
