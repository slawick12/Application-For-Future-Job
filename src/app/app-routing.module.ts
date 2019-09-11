import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { SignInComponent } from './sign-in/sign-in.component';



export const routes: Routes = [
  { path: "**", pathMatch:'full', redirectTo:'sign-in'},
  {path: "sign-in", component: SignInComponent},
  {path: "user-create", component: UserCreateComponent},
  {path: 'user-update', component: UserUpdateComponent},
  {path: 'user-details/:id', component: UserDetailsComponent},
  {path: 'user-list', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
