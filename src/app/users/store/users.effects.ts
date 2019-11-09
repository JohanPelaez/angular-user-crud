import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as userActions from './users.actions';
import {
  AddUser,
  AddUserError,
  AddUserSuccess,
  GetAllUsersError,
  GetAllUsersSuccess,
  GetUser,
  GetUserError,
  GetUserSuccess,
  RemoveUser,
  RemoveUserError,
  RemoveUserSuccess,
  UpdateUser,
  UpdateUserError,
  UpdateUserSuccess
} from './users.actions';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {UsersService} from '../shared/users.service';
import {User} from '../shared/user';
import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private svc: UsersService) {
  }

  @Effect()
  getAllUsers$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.GET_USERS),
    switchMap(() => this.svc.findAll()),
    map(users => new GetAllUsersSuccess(users)),
    catchError((err) => [new GetAllUsersError(err)])
  );

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(userActions.GET_USER),
    map((action: GetUser) => action.payload),
    switchMap(id => this.svc.findById(id)),
    map(user => new GetUserSuccess(user)),
    catchError((err) => [new GetUserError(err)])
  );


  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType(userActions.UPDATE_USER),
    map((action: UpdateUser) => action.payload),
    switchMap(user => this.svc.update(user)),
    map(() => new UpdateUserSuccess()),
    catchError((err) => [new UpdateUserError(err)])
  );

  @Effect()
  createUser$ = this.actions$.pipe(
    ofType(userActions.CREATE_USER),
    map((action: AddUser) => action.payload),
    switchMap(newUser => this.svc.insert(newUser)),
    map((response) => new AddUserSuccess(response.ID)),
    catchError((err) => [new AddUserError(err)])
  );

  @Effect()
  removeUser$ = this.actions$.pipe(
    ofType(userActions.DELETE_USER),
    map((action: RemoveUser) => action.payload),
    switchMap(id => this.svc.delete(id)),
    map((user: User) => new RemoveUserSuccess(user)),
    catchError((err) => [new RemoveUserError(err)])
  );
}
