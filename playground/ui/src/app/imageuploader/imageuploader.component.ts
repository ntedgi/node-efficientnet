import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MessageService } from "primeng/api";
import { HttpClient } from "@angular/common/http";
import Prediction from "../interfces";

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
  @Output() updateClassification = new EventEmitter<Prediction[]>();
  @Output() isLoading = new EventEmitter<boolean>();

  ngOnInit(): void {
  }


  onUpload(event) {

    const result = event.originalEvent.body.result as Prediction[];
    this.updateClassification.emit(result);
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({ severity: "info", summary: "File Uploaded", detail: "" });
    this.isLoading.emit(true)
  }

  onSend(event) {
    this.isLoading.emit(false)
    this.updateImage.emit(event.formData.get("file"));
  }

}
