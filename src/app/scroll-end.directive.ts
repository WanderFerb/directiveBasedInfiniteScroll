import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appScrollEnd]',
  standalone: true
})
export class ScrollEndDirective {

  @Output() end: EventEmitter<void> = new EventEmitter<void>();

  //Remaining pixels at which api should fetch new data
  @Input() thresholdPX = 150;

  private window!: Window;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.window = window;
  }

  @HostListener('window:scroll', ['$event.target'])
  windowScrollEvent(event: KeyboardEvent) {
    // Hieght of the whole page
    const wholePageHieght = this.window.document.documentElement.scrollHeight;
    // console.log('wholePageHieght', wholePageHieght);

    // Size of the element
    const elementHieght = this.el.nativeElement.scrollHeight;
    // console.log('elementHieght', elementHieght);

    //Cuurent Y scroll value
    const currentScrollYvalue = this.window.scrollY;
    // console.log('currentScrollYvalue', currentScrollYvalue);

    // height of current window status, chnages on resizing on Y axis
    const actualHieght = this.window.innerHeight;
    // console.log('actualHieght', actualHieght);

    const spaceBWElementAndPage = wholePageHieght - elementHieght;
    // console.log('spaceBWElementAndPage', spaceBWElementAndPage);

    const bottomScroll =
      elementHieght -
      actualHieght -
      currentScrollYvalue +
      spaceBWElementAndPage;

    // console.log(bottomScroll);

    if (bottomScroll < this.thresholdPX) {
      console.log('[ScrollEndDirective]: emit');
      this.end.emit();
    }
  }

}
