import { Injectable } from "@angular/core";
import { User } from "../_modules/user";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, from, throwError } from "rxjs";
import * as firebase from "firebase/app";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { UserHelper } from "../Dtos/user.helper";
import { AlertifyService } from './alertify.service';

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
    private userHelper: UserHelper,
    private alertify:AlertifyService
  ) {}
  isAdmin(){
    return this.decodedToken.user.role =="admin"
  }

  public loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.getObservableAndSetToken(
      this.authServiceFirebase.auth.signInWithPopup(provider)
    );
  }
  public loginWithEmail(email: string, password: string) {
    return this.getObservableAndSetToken(
      this.authServiceFirebase.auth.signInWithEmailAndPassword(email, password)
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
            console.log("object", obj);
            this.setInitialSettings(obj);
          });
        }
      })
    );
  }
  public setInitialSettings(obj: any) {
    const user_id: string = this.decodedToken.user_id;
    console.log("userId"+ user_id)
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
      })
      this.userService.deleteUser(user_id)
    }
  }
  handleError(error) {
    let errorMessage;
    if (error instanceof ErrorEvent) {
      //error on client-side
      errorMessage = error;
    } else {
      //error on server-side
      errorMessage = `${error.message}`;
    }
    this.alertify.error(errorMessage);
    return throwError(errorMessage);
  }
}
