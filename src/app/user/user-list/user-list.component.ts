import { Component, OnInit } from "@angular/core";



@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  User: any = [];

  constructor() {}

  ngOnInit() {
  }

  //get list of users
  // getListOfUsers() {
  //   return this.restApi.getUsers().subscribe((data: {}) => {
  //     this.User = data;
  //   });
  // }
  // deleteUser(id){
  //   if (window.confirm('Are you sure, you want to delete?')){
  //     this.restApi.deleteUser(id).subscribe(data => {
  //       this.getListOfUsers()
  //     })
  //   }
  // }
}

