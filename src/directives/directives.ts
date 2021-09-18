import { EventEmitter, Output } from '@angular/core';
import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  HostListener,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]',
})
export class HighlightOnHoverDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.color = this.defaultColor;
  }

  @Input() defaultColor: string = 'grey';
  @Input() highlight: string = 'lime';

  @HostBinding('style.color') color: string = this.defaultColor;

  // @HostListener('mouseenter') mouseover() {
  //   this.renderer.setStyle(
  //     this.elementRef.nativeElement,
  //     'border',
  //     '2px solid black'
  //   );

  //   this.color = this.highlight;
  // }

  // @HostListener('mouseleave') mouseleave() {
  //   this.renderer.setStyle(this.elementRef.nativeElement, 'border', '0px');
  //   this.color = this.defaultColor;
  // }

  @Output() inout: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event']) onGlobalClick(event): void {
    // console.log('host');

    if (!this.elementRef.nativeElement.contains(event.target)) {
      // console.log('outside');
      // console.log(event.target);
      this.inout.emit('outside');
    } else {
      // console.log('inside');
      // console.log(event.target);\
      this.inout.emit('inside');
    }
  }
}
