import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, subscribeOn } from 'rxjs/operators';
import { User } from '../_modules/user';
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  getUser(id: string): Observable<any> {
    return this.firestore.collection('Users').doc(id).get().pipe(map(data =>  data.data()));
  }
isAdmin(id:string){
  return new Promise<any>((resolve,reject)=>{
this.getUser(id).subscribe((user)=>{
  resolve(user.role == "admin")
})
  })
}
  getAllUsers(): Observable<any> {
    const list: User[] = [];
    return this.firestore.collection('Users').get().pipe(map( (data) => {
      data.docs.forEach((value) => list.push(value.data() as User));
      return list;
    }));
  }
  setUser(id: string, user: User): Observable<any> {
    return from(this.firestore.collection('Users').doc(id).set(user));
  }

  modifyUserField(id: string, obj: {}) {
    this.firestore.collection('Users').doc(id).update(
      obj
    );
  }
  deleteUser(id:string){
    return this.firestore.collection("Users").doc(id).delete()
  }
}
