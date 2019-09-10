import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertifyService } from './_services/alertify.service';


@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserUpdateComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AlertifyService],
  bootstrap: [AppComponent],

})
export class AppModule { }
