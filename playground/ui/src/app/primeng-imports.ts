import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { PanelModule } from "primeng/panel";
import { TabViewModule } from "primeng/tabview";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { RippleModule } from "primeng/ripple";
import { FileUploadModule } from "primeng/fileupload";
import { DividerModule } from "primeng/divider";
import { ProgressBarModule } from "primeng/progressbar";
import { SkeletonModule } from "primeng/skeleton";
import { OrderListModule } from 'primeng/orderlist';

@NgModule({
  exports: [
    ButtonModule, ProgressBarModule, PanelModule, TabViewModule, InputTextModule, ToastModule, RippleModule, FileUploadModule, DividerModule, SkeletonModule, OrderListModule
  ]
})
export class PrimeNgModuleLoaders {
}
