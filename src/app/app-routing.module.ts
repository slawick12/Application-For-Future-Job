import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserCreateComponent } from "./user/user-create/user-create.component";
import { UserUpdateComponent } from "./user/user-update/user-update.component";
import { UserDetailsComponent } from "./user/user-details/user-details.component";
import { UserListComponent } from "./user/user-list/user-list.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { AuthGuard } from "./guard/auth.guard";

export const routes: Routes = [
  { path: "**", pathMatch: "full", redirectTo: "sign-up" },
  { path: "sign-in", component: SignInComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "user-list", component: UserListComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "user-update", component: UserUpdateComponent },
      { path: "user-details/:id", component: UserDetailsComponent },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
