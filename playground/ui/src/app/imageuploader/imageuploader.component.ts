import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MessageService } from "primeng/api";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-imageuploader",
  templateUrl: "./imageuploader.component.html",
  styleUrls: ["./imageuploader.component.scss"],
  providers: [MessageService, HttpClient]

})
export class ImageuploaderComponent implements OnInit {

  constructor(private messageService: MessageService) {
  }

  uploadedFiles: any[] = [];

  @Output() updateImage = new EventEmitter<string>();
  @Output() updateClassification = new EventEmitter<object>();

  ngOnInit(): void {
  }

  onProgress() {
    console.log("onProgress");

  }

  onUpload(event) {
    this.updateClassification.emit(event.originalEvent.body);

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: "info", summary: "File Uploaded", detail: "" });
  }

  onSend(event) {
    debugger
    console.log("onSend");

    this.updateImage.emit(event.formData.get("file"));
  }

}
