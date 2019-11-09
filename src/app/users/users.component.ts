import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {AppState} from '../app.state';
import {GetAllUsers} from './store/users.actions';
import {
  getCreateError, getDeleteError, getUsersError, getUpdateError, isCreated, isDeleted,
  isUpdated
} from './store/users.reducers';

@Component({
  selector: 'app-users',
  template: `
  <div class="row message" 
  [ngClass]="{'hide-message': !showMessage}">
    <div class="col-sm-12">
      {{message}}
      <span (click)="showMessage=false;">x</span>
    </div>
  </div>
    <router-outlet></router-outlet>`,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  showMessage: boolean;
  message: string;
  constructor(private router: Router,
              private store: Store<AppState>) {
                this.showMessage = false;
                this.message = '';
  }

  ngOnInit() {
    console.log('... Initializing Heroes component');
    this.store.dispatch(new GetAllUsers());

    // subscriptions when success or error action
    this.store.select(getUsersError).subscribe((error) => this.loadingError(error));
    this.store.select(isDeleted).subscribe((done) => {
      this.actionSuccess(done, 'The user was deleted successfully!!!');
    });
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the user');
    });
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done, 'The user was updated successfully!!!');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the user');
    });
    this.store.select(isCreated).subscribe((done) => {
      this.actionSuccess(done, 'The user was created successfully!!!');
    });
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'Error while creating the user');
    });
  }

  /**
   * Display error message if load of Users fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of users');
    }
  }

  /**
   * Display success message after execute specific action over the user
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      this.router.navigate(['/users']);
      this.showMessage = true;
      this.message = message;
    }
  }

  /**
   * Display error message is execution of action fails
   * @param error the error thrown
   * @param message the message to be displayed
   */
  actionError(error, message: string) {
    if (error) {
      alert(message);
    }
  }
}
