import {Component, OnInit} from '@angular/core';
import {User} from '../shared/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import * as userActions from '../store/users.actions';
import {GetUser, UpdateUser} from '../store/users.actions';
import {getUser} from '../store/users.reducers';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  title = 'User Edition';
  user: User;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
                this.form = new FormGroup({
      'ID': new FormControl(),
      'UserName': new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      'Password': new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetUser(+params.id));
    });
    this.store.select(getUser).subscribe(user => {
      if (user != null) {
        this.user = user;
        this.form.reset({
          ID: this.user.ID,
          UserName: this.user.UserName,
          Password: this.user.Password
        })
      }
    });
    
  }

  /**
   * Create a new user
   */
  onSaveUser() {
    this.store.dispatch(new UpdateUser(this.form.value));
  }

  /**
   * If user is in view mode, back to edit mode else go to users page
   */
  onBack() {
    this.router.navigate(['/users']);
  }

  /**
   * Reset all fields in the form
   */
  reset() {
    this.form.reset({
      UserName: '',
      Password: ''
    })
  }

  /**
   * Delete the selected hero
   */
  delete(id: number) {
    if (confirm('Are you sure do you want to delete this User?')) {
      this.store.dispatch(new userActions.RemoveUser(id));
    }
  }

}
