import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, from } from "rxjs";
import { User } from "../_modules/user";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class UserService {
  

  constructor(private firestore: AngularFirestore) {}
  getUser(id:string): Observable<any> {
    return this.firestore
      .collection("users")
      .doc(id)
      .get()
      .pipe(map(data => data.data()));
  }
  setUser(id: string, user: User): Observable<any> {
    return from(
      this.firestore
        .collection("users")
        .doc(id)
        .set(user)
    );
  }
}
