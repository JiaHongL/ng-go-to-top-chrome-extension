import { ApplicationRef, Component, ComponentRef, ViewContainerRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { GoToTopComponent } from './go-to-top/go-to-top.component';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `
      <!-- <ng-container *ngFor="let item of fakeArray;let i = index;">
        <p>測試滾軸是否正常 {{i}} </p>
      </ng-container> -->
      <!-- <app-go-to-top><app-go-to-top> -->
      app-root text : {{ dataService.text }}
  `,
  styles: [],
  standalone: true,
  imports: [GoToTopComponent, NgFor, NgIf]
})
export class AppComponent {
  fakeArray = Array(200).fill('');

  private componentRef: ComponentRef<GoToTopComponent>;
  viewContainerRef = inject(ViewContainerRef);
  appRef = inject(ApplicationRef);

  dataService = inject(DataService);

  constructor() {
    this.componentRef = this.viewContainerRef.createComponent(GoToTopComponent);
    document.body.appendChild(this.componentRef.location.nativeElement);
  }

  ngOnInit(): void {
    // 監聽 component output event
    // this.componentRef.instance.buttonClick.subscribe((event) => console.log('buttonClick text:', event));

    setTimeout(() => {
      // 修改按鈕的 title
      // this.componentRef.instance.text = 'GoToTop';
      this.dataService.text = 'GoToTop';
      setTimeout(() => {
        // 移除這顆元件
        this.componentRef.destroy();
      }, 6000);
    }, 3000);

  }

}


