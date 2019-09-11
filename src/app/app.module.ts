import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AlertifyService } from "./_services/alertify.service";
import { LoginComponent } from "./login/login.component";
import { UserCreateComponent } from "./user/user-create/user-create.component";
import { UserDetailsComponent } from "./user/user-details/user-details.component";
import { UserUpdateComponent } from "./user/user-update/user-update.component";
import { UserListComponent } from "./user/user-list/user-list.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { AuthService } from "./_services/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserUpdateComponent,
    UserListComponent,
    LoginComponent,
    SignInComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AlertifyService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
