# Angular User Crud 

This project display a simple list of users that can be updated, removed, viewed and inserted a new one using http services (through **HttpClient**) and **@ngrx/store and @ngrx/effects** libraries grouping information by modules. The **ngrx** is a Redux inspired library created for Angular to manage the state changes.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0. 

# Getting Started
To start using the application follow the next steps:

## Get the Code
```
git clone
cd angular-user-crud
npm i
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Functionalities

## How to EDIT a user using Ngrx/store & Effects:
1. To edit a user, the system **dispatch** an event with the action **"UPDATE_GAME"**.
2. The **reducer** related to the module **users** is executed and the state is changed updating the information of specific user.
3. An **“ngrx effect”** class is implemented (UserEffects) by module and will be triggered when we dispatch actions with the store.
4. Using some selectors defined in my **reducer** class, we can monitor the success of each action and exceute some specific code after that (like display a success message and/or come back to the home page).

## Structure
- Each module have a folder **store** where will be saved the **actions** (users.actions.ts), **effects** (users.effects.ts) and **reducers** (users.reducers.ts).

- In the module class (users.module.ts) are imported the reducers to be called by each feature using the class **StoreModule** and also the **EffectsModule**.

```
const reducers: ActionReducerMap<any> = {
  users: userReducer.reducer
};

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserEffects])
  ], ...
})
export class UsersModule {}
```

- In the main component of the specific module (*user.component.ts*), I have centralized all the actions to be executed when a CRUD operation has successfully finish or the error thrown using a subscription to the specific select defined in the reducer:

```
this.store.select(isDeleted).subscribe((deleted) => {
    this.actionSuccess(...);
});
this.store.select(getDeleteError).subscribe((error) => {
    this.actionError(...);
});
    
```
# Useful Commands

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
