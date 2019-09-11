import { Injectable } from "@angular/core";
import { User } from "../_modules/user";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  createNewUser: User;
  baseUrl = "http://localhost:3000";

  noAuthHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {}

  login(authCredentials) {
    return this.http.post(
      this.baseUrl + "/login",
      authCredentials,
      this.noAuthHeader
    );
  }
  getProfile() {
    return this.http.get(this.baseUrl + "/user-list");
  }

  //helper methods

  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  deleteToken() {
    localStorage.removeItem("token");
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPlayLoad = atob(token.split(".")[1]);
    } else return null;
  }
  isLoggedIn() {
    var userPlayLoad = this.getUserPayload();
    if (userPlayLoad) return userPlayLoad.exp > Date.now() / 1000;
    else return false;
  }
}
