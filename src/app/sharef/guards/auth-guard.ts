import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  CanMatchFn,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class OtherGuard implements CanActivate {
  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return true;
  }
}

export const authGuard: CanActivateFn = (route, segments) => {
  return false;
};
