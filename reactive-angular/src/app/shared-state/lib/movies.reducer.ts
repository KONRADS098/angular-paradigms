import { createReducer, on, Action, createSelector } from '@ngrx/store';
import { MoviesApiActions, MoviesPageActions } from 'src/app/movies-page/actions';
import { MovieModel } from 'src/app/shared-models/src/lib/movie.model';

const createMovie = (movies: MovieModel[], movie: MovieModel) => [...movies, movie];
const updateMovie = (movies: MovieModel[], changes: MovieModel) =>
  movies.map((movie) => {
    return movie.id === changes.id ? Object.assign({}, movie, changes) : movie;
  });
const deleteMovie = (movies: MovieModel[], movieId: string) =>
  movies.filter((movie) => movieId !== movie.id);

export interface State {
  collection: MovieModel[];
  activeMovieId: string | null;
}

export const initialState: State = {
  collection: [],
  activeMovieId: null,
};

export const reducer = createReducer(
  initialState,
  on(MoviesPageActions.clearSelectedMovie, MoviesPageActions.enter, (state) => {
    return {
      ...state,
      activeMovieId: null,
    };
  }),
  on(MoviesPageActions.selectMovie, (state, action) => {
    return {
      ...state,
      activeMovieId: action.movieId,
    };
  }),
  on(MoviesApiActions.moviesLoaded, (state, action) => {
    return {
      ...state,
      collection: action.movies,
    };
  }),
  on(MoviesApiActions.movieCreated, (state, action) => {
    return {
      collection: createMovie(state.collection, action.movie),
      activeMovieId: null,
    };
  }),
  on(MoviesApiActions.movieUpdated, (state, action) => {
    return {
      collection: updateMovie(state.collection, action.movie),
      activeMovieId: null,
    };
  }),
  on(MoviesApiActions.movieDeleted, (state, action) => {
    return {
      ...state,
      collection: deleteMovie(state.collection, action.movieId),
    };
  })
);

export const selectAll = (state: State) => state.collection;
export const selectActiveMovieId = (state: State) => state.activeMovieId;
export const selectActiveMovie = createSelector(
  selectAll,
  selectActiveMovieId,
  (movies, activeMovieId) =>
    movies.find((movie) => movie.id === activeMovieId) || null
);