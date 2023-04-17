import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieModel } from '@ram/shared-models';

@Component({
  selector: 'ram-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {
  @Input() movies: MovieModel[] | null = [];
  @Input() readonly: boolean | null = false;
  @Output() select = new EventEmitter();
  @Output() delete = new EventEmitter();
}
