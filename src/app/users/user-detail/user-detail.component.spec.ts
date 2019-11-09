import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserDetailComponent} from './user-detail.component';
import {ExtractNamesPipe} from '../../shared/extract-names.pipe';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {UsersService} from '../shared/users.service';
import {EffectsModule} from '@ngrx/effects';
import {ActionReducerMap, Store} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import * as usersReducer from '../store/users.reducers';

export const reducers: ActionReducerMap<any> = {
  users: usersReducer.reducer
};

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let mockStore: MockStore<{ users: usersReducer.State }>;
  const initialState = {
    users: {
      data: [],
      selected: {
        ID: 1,
        UserName: 'pass1',
        Password: 'User 1'
      },
      action: 'GET_USER',
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
        EffectsModule.forRoot([])
      ],
      declarations: [
        UserDetailComponent,
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
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'User Details'`, () => {
    expect(component.title).toEqual('User Details');
  });
});
