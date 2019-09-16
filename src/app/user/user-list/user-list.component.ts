import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "src/app/_services/user.service";
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_modules/user';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {

  user: User;
  model:any=[]
  // uid = this.authService.user_id

  constructor(
    private userService: UserService,
    private userSevice: UserService,
    private authService: AuthService,
    private alertifyService:AlertifyService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    return this.userService.getAllUsers().subscribe((data: {}) => {
      this.model = data;
    });
  }
  deleteUser() {
    if (window.confirm("Are you sure want to delete?")) {
      console.log("userid " + this.authService.decodedToken.user_id)
      this.userSevice.deleteUser(this.authService.decodedToken.user_id).then(data =>
       this.loadUsers()),
       this.alertifyService.success("This user deleted")
    }
  }
}
