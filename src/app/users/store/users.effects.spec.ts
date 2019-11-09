import {TestBed} from '@angular/core/testing';
import {Actions} from '@ngrx/effects';
import {UserEffects} from './users.effects';
import {cold} from 'jasmine-marbles';

import {of, throwError} from 'rxjs';
import {
  AddUserError,
  AddUserSuccess,
  CREATE_USER,
  DELETE_USER,
  GET_USER,
  GET_USERS,
  GetAllUsersError,
  GetAllUsersSuccess,
  GetUserError,
  GetUserSuccess,
  RemoveUserError,
  RemoveUserSuccess,
  UPDATE_USER,
  UpdateUserError,
  UpdateUserSuccess
} from './users.actions';
import {User} from '../shared/user';

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

describe('UserEffects', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects
      ]
    });
    service = jasmine.createSpyObj('svc', ['findAll', 'findById', 'update', 'insert', 'delete']);
  });

  describe('getAllUsers$', () => {
    it('should return a GET_USERS_SUCCESS action, with the Users, on success', () => {
      service.findAll.and.returnValue(of(MOCK_DATA));
      const source = cold('a', {a: {type: GET_USERS}});
      const effects = new UserEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetAllUsersSuccess(MOCK_DATA)});

      expect(effects.getAllUsers$).toBeObservable(expected);
    });

    it('should return a GET_USERS_ERROR action, with the error', () => {
      const error = new Error('Error loading Users');
      service.findAll.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: GET_USERS}});
      const effects = new UserEffects(new Actions(source), service);

      effects.getAllUsers$.subscribe(result => {
        expect(result).toEqual(new GetAllUsersError(error));
      });
    });
  });

  describe('getUser$', () => {
    it('should return a GET_USER_SUCCESS action, with the User found, on success', () => {
      const data = MOCK_DATA[0];
      service.findById.and.returnValue(of(data));
      const source = cold('a', {a: {type: GET_USER}});
      const effects = new UserEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetUserSuccess(data)});

      expect(effects.getUser$).toBeObservable(expected);
    });

    it('should return a GET_USER_ERROR action, with the error', () => {
      const data = MOCK_DATA[0];
      const error = new Error(`Error loading the User with id ${data.ID}`);
      service.findById.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: GET_USER}});
      const effects = new UserEffects(new Actions(source), service);

      effects.getUser$.subscribe(result => {
        expect(result).toEqual(new GetUserError(error));
      });
    });
  });

  describe('updateUser$', () => {
    it('should return a UPDATE_USER_SUCCESS action, without any data', () => {
      const data = {...MOCK_DATA[0], description: 'Description updated'};
      service.update.and.returnValue(of(data));
      const source = cold('a', {a: {type: UPDATE_USER}});
      const effects = new UserEffects(new Actions(source), service);
      const expected = cold('a', {a: new UpdateUserSuccess()});

      expect(effects.updateUser$).toBeObservable(expected);
    });

    it('should return a UPDATE_USER_ERROR action, with the error', () => {
      const data = {...MOCK_DATA[0], description: 'Description updated'};
      const error = new Error(`Error updating the User with id ${data.ID}`);
      service.update.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: UPDATE_USER}});
      const effects = new UserEffects(new Actions(source), service);

      effects.updateUser$.subscribe(result => {
        expect(result).toEqual(new UpdateUserError(error));
      });
    });
  });

  describe('createUser$', () => {
    it('should return a CREATE_USER_SUCCESS action, with the User inserted, on success', () => {
      const data = {
        ID: 3,
        UserName: 'pass3',
        Password: 'User 3'
      };
      service.insert.and.returnValue(of(data));
      const source = cold('a', {a: {type: CREATE_USER}});
      const effects = new UserEffects(new Actions(source), service);
      const expected = cold('a', {a: new AddUserSuccess(data.ID)});

      expect(effects.createUser$).toBeObservable(expected);
    });

    it('should return a CREATE_USER_ERROR action, with the error', () => {
      const data = {
        id: 3,
        image: 'picture3.jpg',
        name: 'User 3',
        releaseDate: new Date(),
        platforms: [1, 2],
        description: 'Descripion of User 3'
      };
      const error = new Error(`Error adding new User with id ${data.id}`);
      service.insert.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: CREATE_USER}});
      const effects = new UserEffects(new Actions(source), service);

      effects.createUser$.subscribe(result => {
        expect(result).toEqual(new AddUserError(error));
      });
    });
  });

  describe('removeUser$', () => {
    it('should return a DELETE_USER_SUCCESS action, with the User deleted, on success', () => {
      const data = MOCK_DATA[1];
      service.delete.and.returnValue(of(data));
      const source = cold('a', {a: {type: DELETE_USER}});
      const effects = new UserEffects(new Actions(source), service);
      const expected = cold('a', {a: new RemoveUserSuccess(data)});

      expect(effects.removeUser$).toBeObservable(expected);
    });

    it('should return a DELETE_USER_ERROR action, with the error', () => {
      const data = MOCK_DATA[1];
      const error = new Error(`Error removing the User with id ${data.ID}`);
      service.delete.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: DELETE_USER}});
      const effects = new UserEffects(new Actions(source), service);

      effects.removeUser$.subscribe(result => {
        expect(result).toEqual(new RemoveUserError(error));
      });
    });
  });
});
