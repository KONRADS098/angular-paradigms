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

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule.forChild([
        { path: '', pathMatch: 'full', component: MoviesPageComponent },
      ]),
      MatCardModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatListModule,
    ],
    declarations: [
      MovieDetailComponent,
      MoviesListComponent,
      MoviesPageComponent,
    ],
})
export class MoviesPageModule {}