import { createAction, props } from '@ngrx/store';
import { MovieModel } from 'src/app/shared-models/src/lib/movie.model';

export const moviesLoaded = createAction(
  '[Movies API] Movies Loaded Success',
  props<{ movies: MovieModel[] }>()
);

export const movieCreated = createAction(
  '[Movies API] Movie Created',
  props<{ movie: MovieModel }>()
);

export const movieUpdated = createAction(
  '[Movies API] Movie Updated',
  props<{ movie: MovieModel }>()
);

export const movieDeleted = createAction(
  '[Movies API] Movie Deleted',
  props<{ movieId: string }>()
);
