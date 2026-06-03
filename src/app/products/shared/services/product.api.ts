import { Injectable } from '@angular/core';
import { interval, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  myObs$ = interval(1000);

}
