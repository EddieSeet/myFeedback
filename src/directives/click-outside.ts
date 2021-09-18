import {
  Directive,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/operator/delay';
// import 'rxjs/add/operator/do';
import { debounceTime, map, tap } from 'rxjs/operators';

@Directive({
  selector: '[click-outside]',
})
export class ClickOutside implements OnDestroy {
  private listening: boolean;
  private globalClick: Observable<Event> = fromEvent(document, 'click');

  @Output('clickOutside') clickOutside: EventEmitter<Object>;

  constructor(private _elRef: ElementRef) {
    this.listening = true;
    this.clickOutside = new EventEmitter();
  }

  ngOnInit() {
    console.log('oninit');
    this.globalClick = fromEvent(document, 'click');

    this.globalClick.subscribe((event: MouseEvent) => {
      console.log('event');
      this.onGlobalClick(event);
    });

    this.subscribeToObservable();
  }
  private subscribeToObservable() {
    console.log('private');
    this.globalClick.subscribe(() => {
      console.log(`The dom has been clicked!`);
    });
  }

  ngOnDestroy() {
    this.globalClick.subscribe();
  }

  onGlobalClick(event: MouseEvent) {
    console.log('GlobalClick');
    if (event instanceof MouseEvent && this.listening === true) {
      if (this.isDescendant(this._elRef.nativeElement, event.target) === true) {
        this.clickOutside.emit({
          target: event.target || null,
          value: false,
        });
      } else {
        this.clickOutside.emit({
          target: event.target || null,
          value: true,
        });
      }
    }
  }

  isDescendant(parent, child) {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }
}
