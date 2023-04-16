import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'tam-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit {
  movies: MovieModel[] = [];
  currentMovie: MovieModel | null = null;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.getMovies();
    this.removeSelectedMovie();
  }

  getMovies() {
    this.moviesService.all().subscribe((movies) => {
      this.movies = movies;
    });
  }

  onSelect(movie: MovieModel) {
    this.currentMovie = movie;
  }

  onCancel() {
    this.removeSelectedMovie();
  }

  removeSelectedMovie() {
    this.currentMovie = null;
  }

  onSave(movie: MovieModel) {
    if ('id' in movie) {
      this.updateMovie(movie);
    } else {
      this.saveMovie(movie);
    }
  }

  saveMovie(movie: MovieModel) {
    this.moviesService.create(movie).subscribe(() => {
      this.getMovies();
      this.removeSelectedMovie();
    });
  }

  updateMovie(movie: MovieModel) {
    this.moviesService.update(movie.id, movie).subscribe(() => {
      this.getMovies();
      this.removeSelectedMovie();
    });
  }

  onDelete(movie: MovieModel) {
    this.moviesService.delete(movie.id).subscribe(() => {
      this.getMovies();
      this.removeSelectedMovie();
    });
  }
}
