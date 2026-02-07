import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'kmd-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  currentLocality = input<string>();
}
