import { Injectable } from "@angular/core";
import { User } from "../_modules/user";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, from } from "rxjs";
import * as firebase from 'firebase/app';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  createNewUser: User;
  baseUrl = "http://localhost:3000";
  decodedToken: any;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  httpOption = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };


  constructor(private http: HttpClient, private authServiceFirebase: AngularFireAuth,
    private userService: UserService,
    private router: Router) {}

  public loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.getToken(
      this.authServiceFirebase.auth.signInWithPopup(provider)
    );
  }
  doRegister(value:any){
    return this.getToken(
      firebase.auth().createUserWithEmailAndPassword(value.email,value.password)
    )
  }
  isLoggedIn():boolean{
    return !this.jwtHelper.isTokenExpired(localStorage.getItem("token"))
  }
  logout(){
    localStorage.removeItem("token")
    return this.authServiceFirebase.auth.signOut()
  }
  private InitialSettings(value:any){
    const user_id:string = this.decodedToken.user_id
    if(this.isLoggedIn()){
     this.userService.getUser(user_id).subscribe((data)=>{
       if(data){
         this.router.navigate(['/weather'])}else{
          //  this.userService.setUser(user_id)
         }
     })
    }
  }
  getToken(promise: Promise<firebase.auth.UserCredential>,
    obj: any = null
  ) {
    return from(promise).pipe(
      map(value => {
        if (value) {
          value.user.getIdToken(true).then(token => {
            localStorage.setItem('token', token);
            this.decodedToken = this.jwtHelper.decodeToken(token);
            this.InitialSettings(value);
          });
        }
      })
    );
  }
  
}
