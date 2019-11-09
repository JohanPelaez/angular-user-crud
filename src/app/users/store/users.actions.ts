import {Action} from '@ngrx/store';
import {User} from '../shared/user';

export const GET_USERS = '[ALL] Users';
export const GET_USERS_SUCCESS = '[ALL] Users Success';
export const GET_USERS_ERROR = '[ALL] Users Error';

export const GET_USER = '[GET] User';
export const GET_USER_SUCCESS = '[GET] Users Success';
export const GET_USER_ERROR = '[GET] Users Error';

export const CREATE_USER = '[CREATE] User';
export const CREATE_USER_SUCCESS = '[CREATE] User Success';
export const CREATE_USER_ERROR = '[CREATE] User Error';

export const DELETE_USER = '[DELETE] User';
export const DELETE_USER_SUCCESS = '[DELETE] User Success';
export const DELETE_USER_ERROR = '[DELETE] User Error';

export const UPDATE_USER = '[UPDATE] User';
export const UPDATE_USER_SUCCESS = '[UPDATE] User Success';
export const UPDATE_USER_ERROR = '[UPDATE] User Error';

/****************************************
 * GET all the users
 ****************************************/
export class GetAllUsers implements Action {
  readonly type = GET_USERS;
}

export class GetAllUsersSuccess implements Action {
  readonly type = GET_USERS_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class GetAllUsersError implements Action {
  readonly type = GET_USERS_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * GET user by id
 ****************************************/
export class GetUser implements Action {
  readonly type = GET_USER;

  constructor(public payload: number) {
  }
}

export class GetUserSuccess implements Action {
  readonly type = GET_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class GetUserError implements Action {
  readonly type = GET_USER_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new user
 ****************************************/
export class AddUser implements Action {
  readonly type = CREATE_USER;

  constructor(public payload: User) {
  }
}

export class AddUserSuccess implements Action {
  readonly type = CREATE_USER_SUCCESS;

  constructor(public payload: number) {
  }
}

export class AddUserError implements Action {
  readonly type = CREATE_USER_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * REMOVE a user by id
 ****************************************/
export class RemoveUser implements Action {
  readonly type = DELETE_USER;

  constructor(public payload: number) {
  }
}

export class RemoveUserSuccess implements Action {
  readonly type = DELETE_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class RemoveUserError implements Action {
  readonly type = DELETE_USER_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * UPDATE user by id
 ****************************************/
export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {
  }
}

export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;
}

export class UpdateUserError implements Action {
  readonly type = UPDATE_USER_ERROR;

  constructor(public payload: Error) {
  }
}
