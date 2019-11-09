import {Component, OnInit} from '@angular/core';
import {User} from '../shared/user';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {AddUser} from '../store/users.actions';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  title = 'Create new User';
  user: User = new User();
  form: FormGroup;

  constructor(private router: Router,
              private store: Store<AppState>) {
    this.form = new FormGroup({
      'UserName': new FormControl(this.user.UserName, [
        Validators.required,
        Validators.minLength(3)
      ]),
      'Password': new FormControl(this.user.UserName, [
        Validators.required,
        Validators.minLength(3)
      ])
    });

  }

  ngOnInit() {
  }

  /**
   * If user is in view mode, back to edit mode else go to Users page
   */
  onBack() {
    this.router.navigate(['/users']);
  }

  /**
   * Create a new hero
   */
  onSaveUser() {
    this.store.dispatch(new AddUser(this.form.value));
  }

  reset() {
    this.form.reset({
      UserName: '',
      Password: ''
    })
  }
}
