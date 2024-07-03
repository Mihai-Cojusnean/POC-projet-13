import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChatComponent} from './components/chat/chat.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatInput} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatBadge} from "@angular/material/badge";

const materialModule = [
  MatIconModule,
  MatCardModule,
  MatButton,
  MatDivider,
  MatInput,
  MatBadge
]

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        materialModule,
        HttpClientModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
