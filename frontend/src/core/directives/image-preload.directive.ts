import { Directive, Input } from "@angular/core";

@Directive({
  selector: "img[custom-fallback]",
  host: {
    '(error)': 'updateUrl()',
    '(load)': 'load()',
    '[src]': 'src'
  }
})
export class ImagePreloadDirective {
  @Input()
  src: string;
  @Input()
  customFallback: string = 'assets/media/logos/towerstation_favicon.png';

  load(): void {

  }

  updateUrl(): void {
    this.src = this.customFallback;
  }
}
