import { NgModule } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import * as fromMovies from './movies.reducer';

export const FEATURE_KEY = 'shared-movies';

/**
 * State Shape
 **/
export interface State {
  movies: fromMovies.State;
}

export const reducers: ActionReducerMap<State> = {
  movies: fromMovies.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];

/**
 * Module
 **/
@NgModule({
  imports: [StoreModule.forFeature(FEATURE_KEY, reducers, { metaReducers })],
})
export class SharedStateMoviesModule {}

/**
 * Feature Selector
 **/
export const selectSharedMoviesState = createFeatureSelector<State>(FEATURE_KEY);

/**
 * Movies Selectors
 */
export const selectMoviesState = createSelector(
    selectSharedMoviesState,
    (state: State) => state.movies
);
export const selectAllMovies = createSelector(
    selectMoviesState,
    fromMovies.selectAll
);
export const selectActiveMovie = createSelector(
    selectMoviesState,
    fromMovies.selectActiveMovie
);