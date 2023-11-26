import { Component, EventEmitter, Input, Output, SimpleChanges, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-go-to-top',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [CommonModule],
  template: `
    <button class="btn-color go-to-top" (click)="goToTop()">{{ dataService.text }}</button>
  `,
  styles: [`
  .go-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    cursor: pointer;
    z-index: 1000;
  }

  .go-to-top:hover {
      background-color: red;
  }

  .btn-color {
      background-color: #2196f3;
  }
`]
})
export class GoToTopComponent {

  dataService = inject(DataService);

  document = inject(DOCUMENT);

  private _text = '回到頂部';

  @Input()
  set text(value: string) {
    this._text = value;
    console.log('Input value changed to: ', value);
  }

  get text(): string {
    return this._text;
  }

  @Output() buttonClick = new EventEmitter();

  ngOnInit(): void {
    console.log('---- GoToTopComponent ngOnInit ----');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('---- GoToTopComponent ngOnChanges ---- ', changes);
  }

  goToTop() {
    this.document.querySelector('main')?.children[1].children[0].children[0].children[0].scrollTo({ top: 0, behavior: 'smooth' });
    this.buttonClick.emit({ text: this.text });
    this.dataService.text = '回到頂部';
  }

  ngOnDestroy(): void {
    console.log('---- GoToTopComponent ngOnDestroy ----');
  }

}



