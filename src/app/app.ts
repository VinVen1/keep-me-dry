import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LoaderComponent} from '@kmd/shared/ui/loader/loader.component';

@Component({
  selector: 'kmd-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
