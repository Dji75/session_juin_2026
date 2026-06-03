import { Component, DestroyRef, inject, linkedSignal, OnDestroy, OnInit } from '@angular/core';
import { ProductApi } from './shared/services/product.api';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { httpResource } from '@angular/common/http';

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
}

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export default class Products implements OnInit {
  readonly #productApi = inject(ProductApi);
  readonly #destroyRef= inject(DestroyRef);

  // readonly destroy$ = new Subject<void>();


  readonly  products = httpResource<Array<Product>>(() => 'https://fakestoreapi.com/products');

  // readonly selectedId = linkedSignal(() => this.products.value()?.[0].id)
  readonly selectedId = linkedSignal<Product[] | undefined, number>({
    source: this.products.value,
    computation: (newItems, previous) => {
      if (newItems?.some((i => i.id === previous?.value))) {
        return previous?.value ?? 0;
      }
      return newItems?.[0].id ?? 0;
     }
  })

  ngOnInit(): void {
    // this.#productApi.myObs$.pipe(
    //   tap(() => console.log('nouvelle emission de myObs$')),
    //   takeUntilDestroyed(this.#destroyRef),
    //   // takeUntil(this.destroy$)
    // ).subscribe({
    //   next: () => { console.log('next') },
    //   complete: () => { console.log('completed')}
    // });
  }

  // ngOnDestroy(): void {
  //   this.destroy$.next();
  // }
  protected onChangeSelection(event: Event) {
    const valueId = (event.target as HTMLSelectElement).value;
    this.selectedId.set(Number(valueId));
  }

  protected updateList() {
    this.products.reload()
  }
}


