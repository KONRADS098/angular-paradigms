import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesPageComponent } from './movies-page.component';
import { MoviesPageModule } from '../movies.page.module';
import { StoreModule } from '@ngrx/store';
import { selectActiveMovie, selectAllMovies } from '@ram/shared-state';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from 'src/app/shared-state/src/lib/movies.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MovieModel } from '@ram/shared-models';
import { MoviesPageActions } from '@ram/movies-page-actions';

describe('MoviesPageComponent', () => {
  let component: MoviesPageComponent;
  let fixture: ComponentFixture<MoviesPageComponent>;
  let store: MockStore;
  let selectAllMoviesSpy: any;
  let selectActiveMovieSpy: any;

  const initialState = {
    collection: [],
    activeMovieId: null,
  };
  
  const testMovies: MovieModel[] = [
    {
      id: '1',
      name: 'Name Movie 1',
      description: 'Description Movie 2', 
      director: 'Director Movie 1'
    },
    {
      id: '2',
      name: 'Name Movie 2',
      description: 'Description Movie 2', 
      director: 'Director Movie 1'
    }
  ];

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    await TestBed.configureTestingModule({
      declarations: [ MoviesPageComponent ], 
      imports: [ 
        BrowserAnimationsModule,
        MoviesPageModule, 
        StoreModule.forRoot({ movie: reducer }), 
        EffectsModule.forRoot([])
      ],
      providers: [
        provideMockStore({ initialState }),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    selectAllMoviesSpy = store.overrideSelector(selectAllMovies, []);
    selectActiveMovieSpy = store.overrideSelector(selectActiveMovie, null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when initialized', () => {
    it('should dispatch an action to enter the page', () => {
      const action = MoviesPageActions.enter();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should select movies from store', () => {
      selectAllMoviesSpy.select.and.returnValue(testMovies);

      component.ngOnInit();

      component.movies$.subscribe(result => {
        expect(result).toEqual(testMovies);
      });
    });

    it('should select currentMovie from store', () => {
      selectActiveMovieSpy.select.and.returnValue(null);

      component.ngOnInit();

      component.currentMovie$.subscribe(result => {
        expect(result).toEqual(null);
      });
    });
  });

  describe('when a movie is selected', () => {
    const testMovie: MovieModel = {
      id: '1',
      name: 'Name Movie 1',
      description: 'Description Movie 2', 
      director: 'Director Movie 1'
    };
  
    beforeEach(() => {
      component.onSelect(testMovie);
    });
  
    it('should dispatch an action to select the movie', () => {
      const action = MoviesPageActions.selectMovie({ movieId: testMovie.id });
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should set the currentMovie property to the selected movie', () => {
      component.currentMovie$.subscribe(result => {
        expect(result).toEqual(testMovie);
      });
    });
  });
});
