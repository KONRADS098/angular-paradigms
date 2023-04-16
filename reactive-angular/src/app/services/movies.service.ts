import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';

import { MovieModel } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private movies: MovieModel[] = [];

  constructor() {}

  all(): Observable<MovieModel[]> {
    return of(this.movies);
  }

  load(id: string): Observable<MovieModel> {
    const movie = this.movies.find(m => m.id === id);
    return of(movie as MovieModel);
  }

  create(movie: MovieModel): Observable<MovieModel> {
    const { id, ...movieWithoutId } = movie;
    const newMovie: MovieModel = {
      id: uuidv4(),
      ...movieWithoutId,
    };
    this.movies = [...this.movies, newMovie];
    return of(newMovie);
  }

  update(id: string, updates: MovieModel): Observable<MovieModel> {
    const movieIndex = this.movies.findIndex(m => m.id === id);
    
    if (movieIndex < 0) {
      return of(updates);
    }
  
    this.movies[movieIndex] = {
      ...this.movies[movieIndex],
      ...updates,
    };

    return of(this.movies[movieIndex]);
  }

  delete(id: string): Observable<any> {
    const index = this.movies.findIndex(m => m.id === id);
    if (index >= 0) {
      this.movies.splice(index, 1);
    }
    return of(null);
  }
}
