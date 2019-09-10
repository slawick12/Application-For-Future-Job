import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';


export const routes: Routes = [
  { path: "**", pathMatch:'full', redirectTo:'create-user'},
  {path: "create-user", component: UserCreateComponent},
  {path: 'user-update', component: UserUpdateComponent},
  {path: 'user-details/:id', component: UserDetailsComponent},
  {path: 'user-list', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
