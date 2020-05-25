import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { fromEvent, Subscription, merge, } from 'rxjs';
import { map, bufferTime, filter } from 'rxjs/operators';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective implements AfterViewInit, OnDestroy {

  @Input() public threshold = 75;
  @Output() public scrollBottomReached = new EventEmitter<void>();
  @Output() public scrollTopReached = new EventEmitter<void>();

  @HostBinding('class')
  public scrollClass = 'scroll';

  @HostBinding('attr.parent-height') private parentHeigh: number;
  private scrollPosition = 0;
  private readonly secureMargin = 15;
  private containerHeight: number;
  private scroll$: Subscription;
  private scrollTop: number;

  constructor(private element: ElementRef<HTMLElement>) { }
  public ngAfterViewInit() {
    this.containerHeight = this.element.nativeElement.offsetHeight;
    this.parentHeigh = this.element.nativeElement.parentElement.offsetHeight;
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
      .pipe(map((ev: WheelEvent) => ev.deltaY > 0));
    /* this.mouseWheel$ = */
    merge(firefox$, browsers$)
      .pipe(
        bufferTime(500),
        filter((actions) => actions.length > 0),
      )
      .subscribe((scrollDown) => this.onScrollDown(this.scrollTop, scrollDown[0]));

  }

  public ngOnDestroy() {
    this.scroll$.unsubscribe();
  }

  @HostListener('window:resize', [])
  public windowResize() {
    this.containerHeight = this.element.nativeElement.offsetHeight;
  }

  public onScrollDown(scrollPosition: number, goToBottom: boolean) {
    if (goToBottom && scrollPosition > this.containerHeight * (this.threshold / 100)) {
      this.scrollBottomReached.emit();
    } else if (!goToBottom && scrollPosition < this.secureMargin) {
      this.scrollTopReached.emit();
    }
    this.scrollPosition = scrollPosition;
  }
}
