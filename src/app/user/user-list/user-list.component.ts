import { Component, OnInit } from "@angular/core";
import { UserService } from 'src/app/_services/user.service';



@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  User: any = [];

  constructor(private userService:UserService) {}

  ngOnInit() {
  }

  
}

