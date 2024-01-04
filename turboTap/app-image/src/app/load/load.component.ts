import { Component } from '@angular/core';
import { LoaderService } from '../modules/core-app-image/loader/loader.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrl: './load.component.scss'
})
export class LoadComponent {
  constructor(public loaderService: LoaderService){}

}
