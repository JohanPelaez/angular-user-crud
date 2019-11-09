import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserEditComponent} from './user-edit.component';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UsersService} from '../shared/users.service';
import * as usersReducer from '../store/users.reducers';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let mockStore: MockStore<{ users: usersReducer.State}>;
  const initialState = {
    users: {
      data: [],
      selected: {
        ID: 1,
        UserName: 'pass1',
        Password: 'User 1'
      },
      action: 'UPDATE_USER',
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
        UserEditComponent
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
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'User Edition'`, () => {
    expect(component.title).toEqual('User Edition');
  });

});
