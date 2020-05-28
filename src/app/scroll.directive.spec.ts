import { Component } from '@angular/core';
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ScrollDirective } from './scroll.directive';

@Component({
  template: `
  <div style="height:1000px; scroll: hidden">
         <div id="test" appScroll
          style="scroll: overflow"
          (scrollBottomReached)="scrollBottomReached()"
          (scrollTopReached)="scrollTopReached()"
          [threshold]="threshold">
          <div style="height:10000px; ">
            Contenct inside scroll
          </div>
        </div>
  </div>
  `
})
class TestComponent {
  public threshold = 90;
  public scrollBottomReached = jasmine.createSpy();
  public scrollTopReached = jasmine.createSpy();
}

describe('ScrollDirective', () => {
  let directive: ScrollDirective;
  let element: HTMLDivElement;
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ScrollDirective],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    const debuEl = fixture.debugElement.query(By.directive(ScrollDirective));
    directive = debuEl.injector.get(ScrollDirective);
    element = debuEl.nativeElement;
    fixture.detectChanges();
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
  it('when scroll is moved down then inside the threshold scrollBottomReached is fired', () => {
    const event = new Event('scroll');
    element.scrollTop = 29000;
    element.scroll();
    element.dispatchEvent(event);
    fixture.detectChanges();
    expect(testComponent.scrollBottomReached).toHaveBeenCalled();
  });
  it('when scroll is moved up then inside the ecurity margin scrollTopReached is fired', () => {
    const event = new Event('scroll');
    element.scrollTop = 29000;
    element.scroll();
    element.scrollTop = 0;
    element.scroll();
    element.dispatchEvent(event);
    fixture.detectChanges();
    expect(testComponent.scrollTopReached).toHaveBeenCalled();
  });
  it('when scroll is moved up outside the threshold scrollTopReached is not fired', () => {
    const event = new Event('scroll');
    element.scrollTop = 15000;
    element.scroll();
    element.dispatchEvent(event);
    fixture.detectChanges();
    expect(testComponent.scrollTopReached).not.toHaveBeenCalled();
  });
  it('when scroll is moved up then outside the security margin scrollTopReached is not fired', () => {
    const event = new Event('scroll');
    element.scrollTop = 15000;
    element.scroll();
    element.scrollTop = 1000;
    element.scroll();
    fixture.detectChanges();
    element.dispatchEvent(event);
    expect(testComponent.scrollTopReached).not.toHaveBeenCalled();
  });

  /** Not achieve to simulate correcly the mousewheel event */
  xit('when scroll wheel is down and scroll is on the bottom then scrollTopReached ', fakeAsync(() => {
    const event = new WheelEvent('mousewheel', { deltaY: -5 });
    element.scrollTop = 30000;
    element.scroll();
    fixture.detectChanges();
    tick(1000);
    element.dispatchEvent(event);
    tick(1500);
    fixture.detectChanges();
    expect(testComponent.scrollBottomReached).toHaveBeenCalled();
  }));


  it('when widow is resized  is moved down then scrollBottomReached is fired', () => {
    const event = new Event('resize') as any;
    window.dispatchEvent(event);
    fixture.detectChanges();
  });
});
