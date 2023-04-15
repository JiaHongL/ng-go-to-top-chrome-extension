import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { GoToTopComponent } from './go-to-top/go-to-top.component';

@Component({
    selector: 'app-root',
    template: `
      <!-- <ng-container *ngFor="let item of fakeArray;let i = index;">
        <p>測試滾軸是否正常 {{i}} </p>
      </ng-container> -->
      <app-go-to-top><app-go-to-top>
  `,
    styles: [],
    standalone: true,
    imports: [GoToTopComponent, NgFor, NgIf]
})
export class AppComponent {
  fakeArray = Array(200).fill('');
}


