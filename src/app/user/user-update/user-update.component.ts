import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-user-update",
  templateUrl: "./user-update.component.html",
  styleUrls: ["./user-update.component.css"]
})
export class UserUpdateComponent implements OnInit {
  id = this.actRoute.snapshot.params["id"];
  UserData: any = {};

  constructor(public actRoute: ActivatedRoute, public router: Router) {}

  ngOnInit() {}

  // // Update user data
  // updateUser() {
  //   if(window.confirm('Are you sure, you want to update?')){
  //     this.restApi.updateUser(this.id, this.UserData).subscribe(data => {
  //       this.router.navigate(['/user-list'])
  //     })
  //   }
  // }
}
