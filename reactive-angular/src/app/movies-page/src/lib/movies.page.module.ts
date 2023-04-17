import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MoviesListComponent } from "./movies-list/movies-list.component";
import { MoviesPageComponent } from "./movies-page/movies-page.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { EffectsModule } from "@ngrx/effects";
import { MoviesApiEffects } from "./movie-api.effects";
import { SharedStateMoviesModule } from "src/app/shared-state/src";

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule.forChild([
        { path: '', pathMatch: 'full', component: MoviesPageComponent },
      ]),
      EffectsModule.forFeature([MoviesApiEffects]),
      MatCardModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatListModule,
      SharedStateMoviesModule,
    ],
    declarations: [
      MovieDetailComponent,
      MoviesListComponent,
      MoviesPageComponent,
    ],
})
export class MoviesPageModule {}