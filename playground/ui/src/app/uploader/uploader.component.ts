import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.scss"]
})
export class UploaderComponent implements OnInit {

  constructor() {
  }

  image2Display: string | ArrayBuffer;
  classificatins: {};

  updateImage(imgPath: File) {
    console.log(imgPath);
    const reader = new FileReader();
    reader.readAsDataURL(imgPath);
    debugger
    reader.onload = (_event) => {
      debugger
      this.image2Display = reader.result;
    };

  }

  updateClassification(result: object) {
    console.log("updateClassification");
    console.log(result);

  }

  ngOnInit(): void {
  }

}
