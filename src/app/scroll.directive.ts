import { Directive, HostBinding, HostListener, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
  private mousewheel$: Subscription;

  constructor(private element: ElementRef<HTMLElement>) { }
  public ngAfterViewInit() {
    this.containerHeight = this.element.nativeElement.offsetHeight;

    this.scroll$ = fromEvent(this.element.nativeElement, 'scroll')
      .pipe(map((event: UIEvent) => (event.target as Element).scrollTop))
      .subscribe((scrollTopPosition) => this.onScrollDown(scrollTopPosition));

    this.mousewheel$ = fromEvent(this.element.nativeElement, 'mousewheel')
      .pipe(map((event: WheelEvent) => event.deltaY > 0))
      .subscribe((isDownDirection) => this.onmouseWheel(isDownDirection));
  }

  public ngOnDestroy() {
    this.scroll$.unsubscribe();
    this.mousewheel$.unsubscribe();
  }

  @HostListener('window:resize', [])
  public windowResize() {
    this.containerHeight = this.element.nativeElement.offsetHeight;
  }

  public onScrollDown(scrollPosition: number) {
    this.scrollPosition = scrollPosition;
  }

  public onmouseWheel(goToBottom: boolean) {
    if (goToBottom && this.scrollPosition > this.containerHeight * (this.threshold / 100)) {
      this.scrollBottomReached.emit();
    } else if (!goToBottom && this.scrollPosition < this.secureMargin) {
      this.scrollTopReached.emit();
    }
  }
}
