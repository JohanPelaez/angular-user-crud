import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
// components
import {UsersComponent} from './users.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserEditComponent} from './user-edit/user-edit.component';

export const usersRoutes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [
    {path: '', component: UserListComponent},
    {path: 'detail/:id', component: UserDetailComponent},
    {path: 'create', component: UserCreateComponent},
    {path: 'edit/:id', component: UserEditComponent}
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}

export const usersRoutedComponents = [
  UsersComponent,
  UserListComponent,
  UserDetailComponent,
  UserCreateComponent,
  UserEditComponent
];
