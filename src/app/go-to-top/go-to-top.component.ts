import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-go-to-top',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [CommonModule],
  template: `
    <button class="btn-color go-to-top" (click)="goToTop()">回到頂部</button>
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
      background-color: #1e88e5;
  }

  .btn-color {
      background-color: #2196f3;
  }
`]
})
export class GoToTopComponent {

  document = inject(DOCUMENT);

  constructor() { }

  goToTop() {
    // this.document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    this.document.querySelector('main')?.children[0].children[0].children[0].scrollTo({ top: 0, behavior: 'smooth' });
  }

}
