import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { PrimeNgModuleLoaders } from './primeng-imports';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploaderComponent } from './uploader/uploader.component';
import { HeaderComponent } from './header/header.component';
import { ImageuploaderComponent } from './imageuploader/imageuploader.component';
import { HttpClientModule } from '@angular/common/http';
import { NoteComponent } from './note/note.component';
import { ResultsComponent } from './results/results.component';
import { SingleResultComponent } from './single-result/single-result.component';

@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent,
    HeaderComponent,
    ImageuploaderComponent,
    NoteComponent,
    ResultsComponent,
    SingleResultComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    PrimeNgModuleLoaders,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
