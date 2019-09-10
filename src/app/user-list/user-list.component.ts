import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../_services/rest-api.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  User: any = [];

  constructor(public restApi: RestApiService) {}

  ngOnInit() {
    this.getListOfUsers()
  }

  //get list of users
  getListOfUsers() {
    return this.restApi.getUsers().subscribe((data: {}) => {
      this.User = data;
    });
  }
}
