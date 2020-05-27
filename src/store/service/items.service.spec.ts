import { fakeAsync, tick, TestBed } from '@angular/core/testing';

import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when call getItems then after 1500 ms items are returned', fakeAsync(() => {
    service.getItems().subscribe((items) => {
      expect(items.length).toBe(20);
    });
    tick(1500);
  }));
  it('when call getItems then after 1500 ms items are returned', fakeAsync(() => {
    service.getItems().subscribe((items) => {
      items.forEach((item) => expect(typeof item.price).toBe('number'));
    });
    tick(1500);
  }));
});
