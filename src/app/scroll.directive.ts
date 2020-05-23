import { Directive, HostBinding, HostListener, Input, Output, EventEmitter, Host, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  @Input() public threshold = 75;
  @Output() public scrollBottomReached = new EventEmitter<void>();
  @Output() public scrollTopReached = new EventEmitter<void>();

  @HostBinding('class')
  public scrollClass = 'scroll';

  private scrollPosition = 0;
  private readonly secureMargin = 50;
  private containerHeight: number;

  constructor(private element: ElementRef<HTMLElement>) { }
  public ngAfterViewInit() {
    this.containerHeight = this.element.nativeElement.offsetHeight;
  }

  @HostListener('window:resize', ['$event'])
  public d(d) {
    this.containerHeight = this.element.nativeElement.offsetHeight;
  }
  @HostListener('scroll', ['$event.target.offsetHeight', '$event.target.scrollTop'])
  public onScrollDown(containerHeight: number, scrollPosition: number) {
    // if (this.scrollPosition < scrollPosition && scrollPosition > containerHeight * (this.threshold / 100)) {
    //   this.scrollBottomReached.emit();
    // } else if (this.scrollPosition > scrollPosition && scrollPosition < this.secureMargin) {
    //   this.scrollTopReached.emit();
    // }
    this.scrollPosition = scrollPosition;
  }
  @HostListener('mousewheel', ['$event.deltaY > 0'])
  public onmouseWheel(goToBottom: boolean) {

    if (goToBottom && this.scrollPosition > this.containerHeight * (this.threshold / 100)) {
      this.scrollBottomReached.emit();
    } else if (!goToBottom && this.scrollPosition < this.secureMargin) {
      this.scrollTopReached.emit();
    }
  }
}
