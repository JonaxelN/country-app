import { Component } from '@angular/core';

@Component({
  selector: 'shared-loader',
  templateUrl: './loader.component.html',
  styles: [
    `
    .spinner-container {
      position: fixed;
      bottom: 15px;
      right: 15px;
      background-color: black;
      color: white;
      padding: 5px 10px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      box-shadow: 0px 3px 5px rbga(0,0,0,0.5);
    }

    span {
      margin-left: 5px;
    }
    `
  ]
})
export class LoaderComponent {

}
