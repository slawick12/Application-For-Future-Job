import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { Router } from "@angular/router";
import { User } from '../_modules/user';


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  @Input() user:User;
  
  model: any = {};

  constructor(
    public authSevice: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  
  loggedIn() {
    return this.authSevice.isLoggedIn();
  }
  logout() {
    localStorage.removeItem("token");
    this.alertify.message("logged out");
    this.router.navigate(['/sign-up'])
  }
}
