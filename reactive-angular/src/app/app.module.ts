import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesApiEffects } from './movie-api.effects';
import { SharedStateMoviesModule } from './state';

@NgModule({
  declarations: [
    AppComponent,
    MoviesPageComponent,
    MovieDetailComponent,
    MoviesListComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', component: MoviesPageComponent },
    ]),
    EffectsModule.forFeature([MoviesApiEffects]),
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]), 
    SharedStateMoviesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
