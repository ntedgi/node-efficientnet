import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploaderComponent } from './uploader/uploader.component';

const routes: Routes = [{ path: '', component: UploaderComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
