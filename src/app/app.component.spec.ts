import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockComponent, MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { getItemsLoaded, getItemsLoading } from '../store/reducers/items.reducers';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

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
