import {NgModule} from '@angular/core';
import {UsersService} from './shared/users.service';
import {usersRoutedComponents, UsersRoutingModule} from './users-routing.module';
import {SharedModule} from '../shared/shared.module';

// ngrx elements
import {StoreModule, ActionReducerMap} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/users.effects';
import * as userReducer from './store/users.reducers';

export const reducers: ActionReducerMap<any> = {
  users: userReducer.reducer
};

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserEffects])
  ],
  declarations: [usersRoutedComponents],
  providers: [
    UsersService
  ]
})
export class UsersModule {
}
