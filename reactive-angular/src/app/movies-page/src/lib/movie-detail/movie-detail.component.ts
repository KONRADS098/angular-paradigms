import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieModel } from 'src/app/shared-models/src/lib/movie.model';

@Component({
  selector: 'ram-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {
  originalMovie: MovieModel | undefined;
  
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  movieForm = new FormGroup({
    name: new FormControl(''),
    director: new FormControl(''),
    description: new FormControl(''),
  });

  @Input() set movie(movie: MovieModel | null) {
    this.movieForm.reset();
    this.originalMovie = undefined;

    if (movie) {
      this.movieForm.setValue({
        name: movie.name,
        director: movie.director,
        description: movie.description,
      });

      this.originalMovie = movie;
    }
  }

  onSubmit(movie: MovieModel) {
    this.save.emit({ ...this.originalMovie, ...movie });
  }
}
