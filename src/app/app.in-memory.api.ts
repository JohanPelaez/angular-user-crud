import {InMemoryDbService} from 'angular-in-memory-web-api';

export class AppInMemoryApi implements InMemoryDbService {
  createDb() {
    return {
      users: [
        {
          "ID": 1,
          "UserName": "User 1 App in memory",
          "Password": "Password1"
        },
        {
          "ID": 2,
          "UserName": "User 2 App in memory",
          "Password": "Password2"
        },
        {
          "ID": 3,
          "UserName": "User 3 App in memory",
          "Password": "Password3"
        },
        {
          "ID": 4,
          "UserName": "User 4 App in memory",
          "Password": "Password4"
        },
        {
          "ID": 5,
          "UserName": "User 5 App in memory",
          "Password": "Password5"
        },
        {
          "ID": 6,
          "UserName": "User 6 App in memory",
          "Password": "Password6"
        },
        {
          "ID": 7,
          "UserName": "User 7 App in memory",
          "Password": "Password7"
        },
        {
          "ID": 8,
          "UserName": "User 8 App in memory",
          "Password": "Password8"
        },
        {
          "ID": 9,
          "UserName": "User 9 App in memory",
          "Password": "Password9"
        },
        {
          "ID": 10,
          "UserName": "User 1 App in memory0",
          "Password": "Password10"
        }
      ]
    };
  }
}
