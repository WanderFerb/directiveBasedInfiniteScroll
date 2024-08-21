import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { dataObj$ } from './data.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent {
  dataSignal = toSignal(dataObj$);
}
