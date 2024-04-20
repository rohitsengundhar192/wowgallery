import { Directive, ElementRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Directive({
  selector: '[appAddAllToPaginator]',
})
export class AddAllToPaginator {
  // allValue = 999999;
  @Input() allValue!: number;
  allValueLabel = 'All'; // or inject i18n service and get translation of "All" in directive constructor

  public constructor(
    private readonly host: MatPaginator,
    private readonly elRef: ElementRef
  ) {
    // @ts-ignore
    const proxiedUpdateDisplayedPageSizeOptions = host._updateDisplayedPageSizeOptions.bind(host);
    // @ts-ignore
    host._updateDisplayedPageSizeOptions = () => {
      proxiedUpdateDisplayedPageSizeOptions();
      // @ts-ignore
      const displayedPageSizeOptions = host._displayedPageSizeOptions;

      if (!displayedPageSizeOptions) return;

      const newDisplayedPageSizeOptions = [
        ...displayedPageSizeOptions,
        this.allValueLabel,
      ];

      // @ts-ignore
      host._displayedPageSizeOptions = newDisplayedPageSizeOptions;
      // @ts-ignore
      host._changeDetectorRef.markForCheck();
    };

    const proxiedChangePageSize = host._changePageSize.bind(host);
    host._changePageSize = (v) => {
      // converting to number if value is string. We need to do so because whole paging logic depend that pageSize is a number.
      // @ts-ignore
      if (v === this.allValueLabel) v = this.allValue;

      proxiedChangePageSize(v);
      elRef.nativeElement.querySelector('.mat-select-value').innerText =
        v === this.allValue ? this.allValueLabel : v;
    };
  }
}
