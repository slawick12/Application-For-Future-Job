import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { AlertifyService } from "./_services/alertify.service";
import { AuthService } from "./_services/auth.service";
import { UserService } from './_services/user.service';

import { UserCreateComponent } from "./user/user-create/user-create.component";
import { UserDetailsComponent } from "./user/user-details/user-details.component";
import { UserUpdateComponent } from "./user/user-update/user-update.component";
import { UserListComponent } from "./user/user-list/user-list.component";
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserHelper } from './Dtos/user.helper';
import { StartAuthguard } from './guard/startAuth.guard';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
   declarations: [
      AppComponent,
      UserCreateComponent,
      UserDetailsComponent,
      UserUpdateComponent,
      UserListComponent,
      SignUpComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule, // imports firebase/firestore, only needed for database features
      AngularFireAuthModule, // imports firebase/auth, only needed for auth features
   ],
   providers: [
      //provide
      AlertifyService,
      AuthService,
      UserService,
      UserHelper,
      AuthGuard,
      StartAuthguard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
