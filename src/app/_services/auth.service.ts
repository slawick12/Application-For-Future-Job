import { Injectable } from "@angular/core";
import { User } from "../_modules/user";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, from } from "rxjs";
import * as firebase from "firebase/app";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { UserHelper } from "../Dtos/user.helper";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  decodedToken: any;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private authServiceFirebase: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private userHelper: UserHelper
  ) {}

  public loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.getObservableAndSetToken(
      this.authServiceFirebase.auth.signInWithPopup(provider)
    );
  }

  doRegister(obj: any) {
    console.log(obj);
    return this.getObservableAndSetToken(
      firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password),
      obj
    );
  }

  isLoggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired(localStorage.getItem("token"));
  }

  logout() {
    localStorage.removeItem("token");
    return this.authServiceFirebase.auth.signOut();
  }

  private getObservableAndSetToken(
    promise: Promise<firebase.auth.UserCredential>,
    obj: any = null
  ) {
    return from(promise).pipe(
      map(value => {
        if (value) {
          value.user.getIdToken(true).then(token => {
            localStorage.setItem("token", token);
            this.decodedToken = this.jwtHelper.decodeToken(token);
            console.log(obj);
            this.setInitialSettings(obj);
          });
        }
      })
    );
  }
  private setInitialSettings(obj: any) {
    const user_id: string = this.decodedToken.user_id;
    if (this.isLoggedIn()) {
      this.userService.getUser(user_id).subscribe(data => {
        if (data) {
          this.router.navigate(["/weather"]);
        } else {
          this.userService.setUser(
            user_id,
            this.userHelper.initializeNewUser(obj, this.decodedToken)
          );
          this.router.navigate(["/weather"]);
        }
      });
    }
  }
}
