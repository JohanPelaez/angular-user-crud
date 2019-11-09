import {async, TestBed, inject, getTestBed} from '@angular/core/testing';

import {UsersService} from './users.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';
import {User} from './user';

const BASE_URL = 'http://fakerestapi.azurewebsites.net/api/Users';
const MOCK_DATA: User[] = [
  {
    ID: 1,
    UserName: 'pass1',
    Password: 'User 1'
  }, {
    ID: 2,
    UserName: 'pass2',
    Password: 'User 2'
  }
];

describe('UsersService', () => {
  let injector: TestBed;
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule, HttpClientModule, HttpClientTestingModule
      ],
      providers: [UsersService]
    });

    injector = getTestBed();
    service = injector.get(UsersService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([UsersService], (svg: UsersService) => {
    expect(svg).toBeTruthy();
  }));

  it('should get list of all users', async(() => {
    service
      .findAll()
      .subscribe((data: User[]) => {
        expect(data.length).toBe(2);
        expect(data[0]).toBe(MOCK_DATA[0]);
        expect(data[1]).toBe(MOCK_DATA[1]);
      });

    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA);
  }));

  it('should get user by id', async(() => {
    const id = 1;
    service
      .findById(id)
      .subscribe((response: User) => {
        expect(response).toBe(MOCK_DATA[0]);
      });

    const req = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA[0]);
  }));

  it('should insert new User', async(() => {
    const newUser = {
      ID: 3,
      UserName: 'pass1',
      Password: 'User 1'
    };
    service
      .insert(newUser)
      .subscribe((successResult) => {
        expect(successResult).toBe(newUser);
      });

    const req: TestRequest = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(newUser);
  }));

  it('should save updates to an existing game', async(() => {
    const user = {
      ...MOCK_DATA[1],
      UserName: 'User 2 changed',
      Password: 'pass2changed'
    };
    const id = user.ID;
    service
      .update(user)
      .subscribe((successResult) => {
        expect(successResult).toBe(user);
      });

    const req: TestRequest = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(user);
  }));

  it('should delete an existing Game', async(() => {
    const data = MOCK_DATA[1];
    service
      .delete(data.ID)
      .subscribe((successResult) => {
        expect(successResult).toBe(data);
      }, (errorResult) => {
        throw(errorResult);
      });

    const req: TestRequest = httpMock.expectOne(`${BASE_URL}/${data.ID}`);
    expect(req.request.method).toBe('DELETE');
  }));
});
