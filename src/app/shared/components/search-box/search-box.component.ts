import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime, map } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer = new Subject<string>();
  @Input()
  public placeholder: string = '';
  @Input()
  public initialValue: string = '';
  @Output()
  public onEmitValue: EventEmitter<string> = new EventEmitter();
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(800)
      )
      .subscribe(value => {
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  public emitValue(value: string): void {
    this.onEmitValue.emit(value);
  }

  // @ViewChild('txtSearch')
  // txtSearchInput!: ElementRef<HTMLInputElement>;
  // public emitValue(): void {
  //   this.onEmitValue.emit(this.txtSearchInput.nativeElement.value);
  // }


  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
