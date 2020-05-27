import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { fromEvent, merge, Subscription, } from 'rxjs';
import { bufferTime, filter, map, tap } from 'rxjs/operators';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective implements AfterViewInit, OnDestroy {

  @Input() public threshold = 75;
  @Output() public scrollBottomReached = new EventEmitter<void>();
  @Output() public scrollTopReached = new EventEmitter<void>();

  @HostBinding('class')
  public scrollClass = 'scroll';

  private scrollPosition = 0;
  private readonly secureMargin = 15;
  private containerHeight: number;
  private scroll$: Subscription;
  private wheel$: Subscription;
  private scrollTop: number;

  constructor(private element: ElementRef<HTMLElement>) { }
  public ngAfterViewInit() {
    this.containerHeight = this.element.nativeElement.offsetHeight;
    this.scroll$ = fromEvent(this.element.nativeElement, 'scroll').pipe(
      map((event: Event) => {
        const scrollTop = (event.target as Element).scrollTop;
        const isToBottom = this.scrollPosition < scrollTop;
        this.scrollTop = scrollTop;
        return { isToBottom, scrollTop };
      }))
      .subscribe(({ isToBottom, scrollTop }) => this.onScrollDown(scrollTop, isToBottom));

    const firefox$ = fromEvent(this.element.nativeElement, 'DOMMouseScroll')
      .pipe(
        map((ev: any) => ev.detail > 0),
      );
    const browsers$ = fromEvent(this.element.nativeElement, 'mousewheel')
      .pipe(
        tap((f) => console.log(f)),
        map((ev: any) => ev.wheelDelta ? ev.wheelDelta < 0 : ev.deltaY > 0));
    /* this.mouseWheel$ = */
    this.wheel$ = merge(firefox$, browsers$)
      .pipe(
        tap((f) => console.log(f)),
        bufferTime(500),
        filter((actions) => actions.length > 0),
      )
      .subscribe((scrollDown) => this.onScrollDown(this.scrollTop, scrollDown[0]));

  }

  public ngOnDestroy() {
    this.scroll$.unsubscribe();
    this.wheel$.unsubscribe();
  }

  @HostListener('window:resize', [])
  public windowResize() {
    this.containerHeight = this.element.nativeElement.offsetHeight;
  }

  public onScrollDown(scrollPosition: number, goToBottom: boolean) {
    const viewHeight = this.element.nativeElement.scrollHeight - this.containerHeight;
    // console.log(scrollPosition, goToBottom, viewHeight);
    if (goToBottom && scrollPosition > viewHeight * (this.threshold / 100)) {
      this.scrollBottomReached.emit();
    } else if (!goToBottom && scrollPosition < this.secureMargin) {
      this.scrollTopReached.emit();
    }
    this.scrollPosition = scrollPosition;
  }
}
