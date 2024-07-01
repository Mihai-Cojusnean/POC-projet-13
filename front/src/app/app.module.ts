import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChatComponent} from './components/chat/chat.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatButton,
    MatCardModule,
    MatDivider,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
