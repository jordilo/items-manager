import { Directive, HostBinding, HostListener, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription, merge } from 'rxjs';
import { map, tap, pairwise } from 'rxjs/operators';

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
  private readonly secureMargin = 50;
  private containerHeight: number;
  private scroll$: Subscription;

  constructor(private element: ElementRef<HTMLElement>) { }
  public ngAfterViewInit() {
    this.containerHeight = this.element.nativeElement.offsetHeight;

    this.scroll$ = fromEvent(this.element.nativeElement, 'scroll').pipe(
      map((event: Event) => {
        const scrollTop = (event.target as Element).scrollTop;
        const isToBottom = this.scrollPosition < scrollTop;
        return { isToBottom, scrollTop };
      }))
      .subscribe(({ isToBottom, scrollTop }) => this.onScrollDown(scrollTop, isToBottom));
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
