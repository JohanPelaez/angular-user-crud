import {State, reducer} from './users.reducers';
import {
    GET_USERS,
    GetAllUsers,
    GetAllUsersSuccess,
    GET_USERS_ERROR,
    GetAllUsersError,
    GetUser,
    GET_USER,
    GetUserSuccess,
    GetUserError,
    CREATE_USER,
    CREATE_USER_ERROR,
    AddUserSuccess,
    AddUserError,
    AddUser,
    UPDATE_USER,
    UpdateUser,
    UpdateUserSuccess,
    UpdateUserError,
    DELETE_USER,
    RemoveUser,
    RemoveUserSuccess,
    RemoveUserError
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

let state: State = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null
};

describe('Load all Users REDUCER', () => {
    it('should reduce the action GET_USERS', () => {
        const action = new GetAllUsers();
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            action: GET_USERS,
            done: false
        });
        state = newState;
    });
    it('should reduce the action GET_USERS_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllUsersSuccess(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            data: payload,
            done: true
        });
        state = newState;
    });
    it('should reduce the action GET_USERS_ERROR', () => {
        const payload = new Error('Error loading all Users');
        const action = new GetAllUsersError(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            done: true,
            error: action.payload
        });
    });
});

describe('GET User by id REDUCER', () => {
    it('should reduce the action GET_USER', () => {
        const payload = MOCK_DATA[0].ID;
        const action = new GetUser(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            action: GET_USER,
            done: false
        });
        state = newState;
    });
    it('should reduce the action GET_USER_SUCCESS', () => {
        const payload = MOCK_DATA[0];
        const action = new GetUserSuccess(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: payload,
            done: true
        });
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action GET_USER_ERROR', () => {
        const payload = new Error('Error loading the User');
        const action = new GetUserError(payload);
        const newState = reducer(state, action);
        expect({...newState }).toEqual({
            ...state,
            done: true,
            error: action.payload
        });
    });
});

describe('Create new User REDUCER', () => {
    it('should reduce the action CREATE_USER', () => {
        const payload = {
            ID: 3,
            UserName: 'pass3',
            Password: 'User 3'
          };
        const action = new AddUser(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: payload,
            action: CREATE_USER,
            done: false
        });
        state = newState;
    });
    it('should reduce the action CREATE_USER_SUCCESS', () => {
        const payload = 3;
        const action = new AddUserSuccess(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            data: [
                ...state.data,
                {
                    ...state.selected,
                    ID: payload
                }
            ],
            selected: null,
            done: true
        });
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action CREATE_USER_ERROR', () => {
        const payload = new Error('Error creating the User');
        const action = new AddUserError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: null,
            done: true,
            error: payload
        });
    });
});

describe('Update existing User REDUCER', () => {
    it('should reduce the action UPDATE_USER', () => {
        const payload = {...MOCK_DATA[0], description: 'Descripion of User 1 edited'};
        const action = new UpdateUser(payload);
        const newState = reducer(state, action);
        expect({ ...newState}).toEqual({
            ...state,
            selected: payload,
            action: UPDATE_USER,
            done: false
        });
        state = newState;
    });
    it('should reduce the action UPDATE_USER_SUCCESS', () => {
        const index = 0;
        const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
        ];
        const action = new UpdateUserSuccess();
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, data, done: true, selected: null, error: null});
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action UPDATE_USER_ERROR', () => {
        const payload = new Error('Error updating the User');
        const action = new UpdateUserError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, done: true, error: payload});
    });
});

describe('Deleting existing User REDUCER', () => {
    it('should reduce the action DELETE_USER', () => {
        const selected = MOCK_DATA[1];
        const payload = selected.ID;
        const action = new RemoveUser(payload);
        const newState = reducer(state, action);

        expect({ ...newState}).toEqual({
            ...state,
            selected,
            action: DELETE_USER,
            done: false
        });
        state = newState;
    });
    it('should reduce the action DELETE_USER_SUCCESS', () => {
        const payload = MOCK_DATA[1];
        const action = new RemoveUserSuccess(payload);
        const data = state.data.filter(h => h.ID !== state.selected.ID);
        const newState = reducer(state, action);
        expect({...newState}).toEqual( {...state, data, selected: null, done: true});
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action DELETE_USER_ERROR', () => {
        const payload = new Error('Error while deleting the User');
        const action = new RemoveUserError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, done: true, error: payload});
    });
});
