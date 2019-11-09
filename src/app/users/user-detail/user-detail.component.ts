import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import * as userActions from '../store/users.actions';
import {GetUser} from '../store/users.actions';
import {Observable} from 'rxjs';
import {User} from '../shared/user';
import {getUser} from '../store/users.reducers';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  title = 'User Details';
  user: Observable<User>;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetUser(+params.id));
    });
    this.user = this.store.select(getUser);
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
