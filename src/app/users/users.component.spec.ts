import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import {UsersService} from './shared/users.service';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as usersReducer from './store/users.reducers';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
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
        EffectsModule
      ],
      declarations: [
        UsersComponent
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
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
