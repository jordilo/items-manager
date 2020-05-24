import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavsModalComponent } from './favs-modal.component';

describe('FavsModalComponent', () => {
  let component: FavsModalComponent;
  let fixture: ComponentFixture<FavsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
