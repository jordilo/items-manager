import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { MockService, MockComponent } from 'ng-mocks';
import { Store } from '@ngrx/store';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { getItemsLoading, getItemsLoaded } from '../store/reducers/items.reducers';

describe('AppComponent', () => {

  let dispatchSpy: jasmine.Spy;
  let selectSpy: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        MockComponent(MainComponent)
      ],
      providers: [{ provide: Store, useValue: MockService(Store) }]
    }).compileComponents();
  }));

  beforeEach(() => {
    const store = TestBed.inject(Store);
    dispatchSpy = spyOn(store, 'dispatch');
    selectSpy = spyOn(store, 'select');
    selectSpy.and.callFake((arg: any) => {
      if (arg === getItemsLoading) {
        return of(false);
      } else if (arg === getItemsLoaded) {
        return of(false);
      }
    });
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.loading')).toBeDefined();
  });
  it('when both getItemLoading and getItems loaded are false then loading is visible', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.loading')).toBeDefined();
  });
  it('when both getItemLoading is true and getItems loaded is true then loading is visible', () => {
    selectSpy.and.callFake((arg: any) => {
      if (arg === getItemsLoading) {
        return of(true);
      } else if (arg === getItemsLoaded) {
        return of(false);
      }
    });
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.loading')).toBeDefined();
  });
  it('when both getItemLoading  and getItems loaded are true then loading is visible', () => {
    selectSpy.and.callFake((arg: any) => {
      if (arg === getItemsLoading) {
        return of(true);
      } else if (arg === getItemsLoaded) {
        return of(true);
      }
    });
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.loading')).toBeDefined();
  });
  it('when both getItemLoading is false and getItems loaded is true then app is visible', () => {
    selectSpy.and.callFake((arg: any) => {
      if (arg === getItemsLoading) {
        return of(false);
      } else if (arg === getItemsLoaded) {
        return of(true);
      }
    });
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.loading')).toBeNull();
  });
});
