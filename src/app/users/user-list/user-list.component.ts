import {Component, OnInit, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {User} from '../shared/user';
import {Observable} from 'rxjs';
import * as userActions from '../store/users.actions';
import {getAllUsers} from '../store/users.reducers';
import {UsersService} from '../shared/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  message: string;
  title = 'List of Users';
  users: Observable<User[]>;
  showMessage: boolean;

  constructor( private router: Router,
                private store: Store<AppState>) {
                }
                
  ngOnInit() {
    console.log('... initializing Hero list component.');

    this.users = this.store.select(getAllUsers);
  }

  /**
   * Delete the selected hero
   */
  delete(id: number) {
    if (confirm('Are you sure do you want to delete this User?')) {
      this.store.dispatch(new userActions.RemoveUser(id));
      this.message = 'The user was deleted successfully!!!';
      this.showMessage = true;
    }
  }
}
