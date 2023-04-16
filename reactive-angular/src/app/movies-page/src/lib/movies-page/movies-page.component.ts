import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../../../../shared-models/src/lib/movie.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectActiveMovie, selectAllMovies } from '../../../../shared-state';
import { MoviesPageActions } from 'src/app/movies-page/actions';

@Component({
  selector: 'ram-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit {
  movies$: Observable<MovieModel[]>;
  currentMovie$: Observable<MovieModel | null>;

  constructor(private store: Store) {
    this.movies$ = store.select(selectAllMovies);
    this.currentMovie$ = store.select(selectActiveMovie);
  }

  ngOnInit() {
    this.store.dispatch(MoviesPageActions.enter());
  }

  onSelect(movie: MovieModel) {
    this.store.dispatch(MoviesPageActions.selectMovie({ movieId: movie.id }));
  }

  onCancel() {
    this.removeSelectedMovie();
  }

  removeSelectedMovie() {
    this.store.dispatch(MoviesPageActions.clearSelectedMovie());
  }

  onSave(movie: MovieModel) {
    if ('id' in movie) {
      this.updateMovie(movie);
    } else {
      this.saveMovie(movie);
    }
  }

  saveMovie(movie: MovieModel) {
    this.store.dispatch(MoviesPageActions.createMovie({ movie: movie }));
  }

  updateMovie(movie: MovieModel) {
    this.store.dispatch(MoviesPageActions.updateMovie({ movieId: movie.id, changes: movie }));
  }

  onDelete(movie: MovieModel) {
    this.store.dispatch(MoviesPageActions.deleteMovie({ movieId: movie.id }));
  }
}
