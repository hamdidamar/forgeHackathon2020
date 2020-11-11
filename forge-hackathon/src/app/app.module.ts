import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { ViewerComponent } from './viewer/viewer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ColorPickerModule } from 'ngx-color-picker';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectsComponent,
    ViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
