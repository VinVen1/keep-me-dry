import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LoadingService} from '@kmd/shared/services';

@Component({
  selector: 'kmd-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  private readonly _loadingService = inject(LoadingService)
  protected msg = this._loadingService.message;
  protected isLoading = this._loadingService.isLoading
}
