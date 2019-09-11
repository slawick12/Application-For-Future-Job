import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}
  model = {
    email: "",
    password: ""
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  errorMessage: string;
  ngOnInit() {
    if(this.authService.isLoggedIn())
    this.router.navigateByUrl("/userprofile")
  }

  onSubmit(form: NgForm) {
    this.authService.login(form.value).subscribe(res => {
      this.authService.setToken(res["token"]);
      this.router.navigateByUrl("user-list");
    },
    erro =>{
      this.alertify.error("Something went wrong");
      
    });
  }
}
