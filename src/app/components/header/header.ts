import { Component, inject } from '@angular/core';
import { ProductApi } from '../../products/shared/services/product.api';
import { RouterLink } from '@angular/router';
import { Highlight } from '../../shared/directives/highlight/highlight';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    Highlight
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly #productApi = inject(ProductApi);
}
