import { Component, OnInit, Input } from "@angular/core";
import { RestApiService } from "../_services/rest-api.service";
import { Router } from "@angular/router";
import { resolve } from "q";
import { AlertifyService } from "../_services/alertify.service";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"]
})
export class UserCreateComponent implements OnInit {
  @Input() userDetails = { name: "", email: "", phone: 0 };

  constructor(
    private restApi: RestApiService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  addUser() {
    this.restApi.createUser(this.userDetails).subscribe(
      () => {
        this.alertify.success("Create user");
      },
      () => {
        ()=>{
          this.alertify.error("There are some problem")
        }
        this.router.navigate(["/user-list"]);
      }
    );
  }
}
