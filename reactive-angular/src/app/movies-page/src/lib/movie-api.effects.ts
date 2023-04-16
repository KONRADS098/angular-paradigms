import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, exhaustMap, concatMap } from 'rxjs/operators';
import { MoviesService } from '../../../shared-services/src';
import { MoviesPageActions, MoviesApiActions } from '../../actions';

@Injectable()
export class MoviesApiEffects {
  constructor(private moviesService: MoviesService, private actions$: Actions) {}

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesPageActions.enter),
      exhaustMap(() =>
        this.moviesService
          .all()
          .pipe(map((movies) => MoviesApiActions.moviesLoaded({ movies })))
      )
    )
  );

  createMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesPageActions.createMovie),
      concatMap((action) =>
        this.moviesService
          .create(action.movie)
          .pipe(map((movie) => MoviesApiActions.movieCreated({ movie })))
      )
    )
  );

  updateMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesPageActions.updateMovie),
      concatMap((action) =>
        this.moviesService
          .update(action.movieId, action.changes)
          .pipe(map((movie) => MoviesApiActions.movieUpdated({ movie })))
      )
    )
  );

  deleteMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesPageActions.deleteMovie),
      mergeMap((action) =>
        this.moviesService
          .delete(action.movieId)
          .pipe(
            map(() => MoviesApiActions.movieDeleted({ movieId: action.movieId }))
          )
      )
    )
  );
}
