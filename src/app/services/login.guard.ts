import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CoreService } from './core.service';


@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(
        private coreService: CoreService,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.coreService.loggedIn) return true;
        this.coreService.lastUrl = state.url;
        return this.coreService.router.navigate(["/login"]);
    }

}
