import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appOutsideClick]',
  standalone: true
})
export class OutsideClickDirective {
  @Output() outsideClick = new EventEmitter<Event>();

  constructor(private _elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.outsideClick.emit(event);
    }
  }

}
