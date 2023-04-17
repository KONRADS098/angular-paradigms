import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesPageComponent } from './movies-page.component';
import { MoviesPageModule } from '../movies.page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesService } from '@ram/shared-services';
import { of } from 'rxjs';
import { MovieModel } from '@ram/shared-models';

describe('MoviesPageComponent', () => {
  let component: MoviesPageComponent;
  let fixture: ComponentFixture<MoviesPageComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;

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
    moviesService = jasmine.createSpyObj('MoviesService', ['all', 'update']);
    moviesService.all.and.returnValue(of(testMovies));

    await TestBed.configureTestingModule({
      declarations: [ MoviesPageComponent ], 
      imports: [ MoviesPageModule, BrowserAnimationsModule ],
      providers: [{ provide: MoviesService, useValue: moviesService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when initialized', () => {
    beforeEach(() => {
      moviesService.all.and.returnValue(of(testMovies));
      component.ngOnInit();
    });

    it('should call the movies service to get all movies', () => {
      expect(moviesService.all).toHaveBeenCalled();
    });

    it('should set the movies property with the response from the movies service', () => {
      expect(component.movies).toEqual(testMovies);
    });

    it('should set the currentMovie property to null', () => {
      expect(component.currentMovie).toBeNull();
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

    it('should set the currentMovie property to the selected movie', () => {
      expect(component.currentMovie).toEqual(testMovie);
    });
  });

  describe('when the cancel button is clicked', () => {
    const testMovie: MovieModel = {
      id: '1',
      name: 'Name Movie 1',
      description: 'Description Movie 2', 
      director: 'Director Movie 1'
    };

    beforeEach(() => {
      component.onSelect(testMovie);
      component.onCancel();
    });

    it('should set the currentMovie property to null', () => {
      expect(component.currentMovie).toBeNull();
    });
  });

  describe('when the movie already exists', () => {
    const testMovie: MovieModel = {
      id: '1',
      name: 'Test Movie 1',
      director: 'Test Director 1',
      description: 'Test Description 1',
    };
  
    beforeEach(() => {
      component.onSelect(testMovie);
    });
  
    it('should call the update method on the movies service', () => {
      const spy = moviesService.update.and.returnValue(of(testMovie));
  
      component.onSave(testMovie);
  
      expect(spy).toHaveBeenCalledWith(testMovie.id, testMovie);
    });
  
    it('should call the getMovies method after saving', () => {
      spyOn(component, 'getMovies');
  
      moviesService.update.and.returnValue(of(testMovie));
  
      component.onSave(testMovie);
  
      expect(component.getMovies).toHaveBeenCalled();
    });
  
    it('should set the currentMovie property to null after saving', () => {
      moviesService.update.and.returnValue(of(testMovie));
  
      component.onSave(testMovie);
  
      expect(component.currentMovie).toBeNull();
    });
  });

});
