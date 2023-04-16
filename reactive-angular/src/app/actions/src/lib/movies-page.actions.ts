import { createAction, props } from '@ngrx/store';
import { MovieModel } from 'src/app/shared-models/src/lib/movie.model';

export const enter = createAction('[Movies Page] Enter');

export const selectMovie = createAction(
  '[Movies Page] Select Movie',
  props<{ movieId: string }>()
);

export const clearSelectedMovie = createAction(
  '[Movies Page] Clear Selected Movie'
);

export const createMovie = createAction(
  '[Movies Page] Create Movie',
  props<{ movie: MovieModel }>()
);

export const updateMovie = createAction(
  '[Movies Page] Update Movie',
  props<{ movieId: string; changes: MovieModel }>()
);

export const deleteMovie = createAction(
  '[Movies Page] Delete Movie',
  props<{ movieId: string }>()
);
