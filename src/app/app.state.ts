import * as fromUsers from './users/store/users.reducers';

export interface AppState {
  users: fromUsers.State;
}
