import {
    GetAllUsers,
    GET_USERS,
    GET_USERS_SUCCESS,
    GetAllUsersSuccess,
    GetAllUsersError,
    GET_USERS_ERROR,
    GetUser,
    GET_USER,
    GetUserSuccess,
    GET_USER_SUCCESS,
    GetUserError,
    GET_USER_ERROR,
    AddUser,
    CREATE_USER,
    AddUserSuccess,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    AddUserError,
    RemoveUser,
    DELETE_USER,
    RemoveUserSuccess,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
    RemoveUserError,
    UpdateUser,
    UPDATE_USER,
    UpdateUserSuccess,
    UPDATE_USER_ERROR,
    UpdateUserError,
    UPDATE_USER_SUCCESS
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
/****************************************
 * GET all the users
 ****************************************/
describe('Load All Users ACTION', () => {
    it('should create the action GET_USERS', () => {
        const action = new GetAllUsers();
        expect({...action}).toEqual({type: GET_USERS});
    });
    it('should create the action GET_USERS_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllUsersSuccess(payload);
        expect({...action}).toEqual({type: GET_USERS_SUCCESS, payload});
    });
    it('should create the action GET_USERS_ERROR', () => {
        const payload = new Error('Error loading all users');
        const action = new GetAllUsersError(payload);
        expect({...action}).toEqual({
            type: GET_USERS_ERROR, payload
        });
    });
});
/****************************************
 * GET user by id
 ****************************************/
describe('Load specific User ACTION', () => {
    it('should create the action GET_USER', () => {
        const payload = MOCK_DATA[0].ID;
        const action = new GetUser(payload);
        expect({...action}).toEqual({ type: GET_USER, payload });
    });
    it('should create the action GET_USER_SUCCESS', () => {
        const payload = MOCK_DATA[0];
        const action = new GetUserSuccess(payload);
        expect({...action}).toEqual({ type: GET_USER_SUCCESS, payload });
    });
    it('should create the action GET_USER_ERROR', () => {
        const payload = new Error('Error loading the User');
        const action = new GetUserError(payload);
        expect({...action}).toEqual({
            type: GET_USER_ERROR, payload
        });
    });
});

/****************************************
 * ADD new user
 ****************************************/
describe('Create new User ACTION', () => {
    it('should create the action CREATE_USER', () => {
        const payload = MOCK_DATA[1];
        const action = new AddUser(payload);
        expect({...action}).toEqual({
            type: CREATE_USER, payload
        });
    });
    it('should create the action CREATE_USER_SUCCESS', () => {
        const payload = MOCK_DATA[1].ID;
        const action = new AddUserSuccess(payload);
        expect({...action}).toEqual({ type: CREATE_USER_SUCCESS, payload });
    });
    it('should create the action CREATE_USER_ERROR', () => {
        const payload = new Error('Error while adding a new User');
        const action = new AddUserError(payload);
        expect({...action}).toEqual({ type: CREATE_USER_ERROR, payload });
    });
});
/****************************************
 * REMOVE a user by id
 ****************************************/
describe('Remove a User ACTION', () => {
    it('should create the action DELETE_USER', () => {
        const payload = MOCK_DATA[1].ID;
        const action = new RemoveUser(payload);
        expect({...action}).toEqual({ type: DELETE_USER, payload });
    });
    it('should create the action DELETE_USER_SUCCESS', () => {
        const payload = MOCK_DATA[1];
        const action = new RemoveUserSuccess(payload);
        expect({...action}).toEqual({ type: DELETE_USER_SUCCESS, payload });
    });
    it('should create the action DELETE_USER_ERROR', () => {
        const payload = new Error('Error removing User.');
        const action = new RemoveUserError(payload);
        expect({...action}).toEqual({ type: DELETE_USER_ERROR, payload });
    });
});
/****************************************
 * UPDATE user by id
 ****************************************/
describe('Update a User ACTION', () => {
    it('should create the action UPDATE_USER', () => {
        const payload = MOCK_DATA[0];
        const action = new UpdateUser(payload);
        expect({...action}).toEqual({ type: UPDATE_USER, payload });
    });
    it('should create the action UPDATE_USER_SUCCESS', () => {
        const action = new UpdateUserSuccess();
        expect({...action}).toEqual({type: UPDATE_USER_SUCCESS});
    });
    it('should create the action UPDATE_USER_ERROR', () => {
        const payload = new Error('Error updating User.');
        const action = new UpdateUserError(payload);
        expect({...action}).toEqual({
            type: UPDATE_USER_ERROR, payload
        });
    });
});
