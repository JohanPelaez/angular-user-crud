import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserListComponent} from './user-list.component';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Store, StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {UsersService} from '../shared/users.service';
import {ExtractNamesPipe} from '../../shared/extract-names.pipe';
import * as usersReducer from '../store/users.reducers';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockStore: MockStore<{ users: usersReducer.State}>;
  const initialState = {
    users: {
      data: [
        {
          ID: 1,
          UserName: 'pass1',
          Password: 'User 1'
        }, {
          ID: 2,
          UserName: 'pass2',
          Password: 'User 2'
        }
      ],
      selected: null,
      action: 'GET_USERS',
      done: true
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot([]),
        EffectsModule
      ],
      declarations: [
        UserListComponent,
        ExtractNamesPipe
      ],
      providers: [
        UsersService,
        {provide: APP_BASE_HREF, useValue: '/'},
        provideMockStore({initialState})
      ]
    })
      .compileComponents();

    mockStore = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'List of Users'`, () => {
    expect(component.title).toEqual('List of Users');
  });
});
