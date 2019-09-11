import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { User } from "../_modules/user";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RestApiService {
  baseUrl = "http://localhost:3000";
  errorMessage = "";
  

  constructor(private http: HttpClient) {}

  httpOption = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  //get mothod => fetch users list
  getUsers(): Observable<User> {
    return this.http.get<User>(this.baseUrl + "/users");
  }
  // get(id) method => fetch user id
  getUser(id): Observable<User> {
    return this.http
      .get<User>(this.baseUrl + "/users" + id)
      .pipe(catchError(this.handleError));
  }
  createUser(user): Observable<User> {
    return this.http
      .post<User>(
        this.baseUrl + "/users",
        JSON.stringify(user),
        this.httpOption
      )
      .pipe(catchError(this.handleError));
  }
  updateUser(id, user): Observable<User> {
    return this.http
      .put<User>(
        this.baseUrl + "/users" + id,
        JSON.stringify(user),
        this.httpOption
      )
      .pipe(catchError(this.handleError));
  }
  deleteUser(id) {
    return this.http.delete<User>(this.baseUrl + "/users", this.httpOption);
  }
  handleError(error) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      //error on client-side
      errorMessage = error.error.message;
    } else {
      //error on server-side
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
