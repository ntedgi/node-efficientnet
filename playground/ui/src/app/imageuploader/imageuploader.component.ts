import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import Prediction from '../interfces';
import {LanguagesApiService} from '../languages-api.service'

@Component({
  selector: 'app-imageuploader',
  templateUrl: './imageuploader.component.html',
  styleUrls: ['./imageuploader.component.scss'],
  providers: [MessageService, HttpClient],
})
export class ImageuploaderComponent implements OnInit {
  constructor(private messageService: MessageService, private languagesApi: LanguagesApiService) {
  }

  languages: SelectItem[];
  selectedLanguage: SelectItem;
  selectedLanguageName: string;

  uploadedFiles: any[] = [];

  @Output() updateImage = new EventEmitter<string>();
  @Output() updateClassification = new EventEmitter<Prediction[]>();
  @Output() isLoading = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.languagesApi.getLanguages().subscribe((data) => {
      const languagesArray = Object.values(data);
      this.languages = languagesArray.map(language => ({label: language, value: null}));
      this.selectedLanguage = this.languages[0];
      this.selectedLanguageName = this.getSelectedLanguageName();
    });
  }

  onChange(event) {
    this.selectedLanguageName = this.getSelectedLanguageName();;
  }

  onUpload(event) {
    const result = event.originalEvent.body.result as Prediction[];
    this.updateClassification.emit(result);
    this.uploadedFiles = [event.files[event.files.length - 1]];
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
    this.isLoading.emit(true);
  }

  onSend(event) {
    this.isLoading.emit(false);
    this.uploadedFiles = [];
    this.updateImage.emit(event.formData.get('file'));
  }
  getSelectedLanguageName(){
    return this.selectedLanguage.label.toLowerCase();
  }
}
