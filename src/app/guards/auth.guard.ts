// import { inject } from "@angular/core";
// import {
//     ActivatedRouteSnapshot,
//     CanActivateChildFn,
//     CanActivateFn,
//     Router,
//     RouterStateSnapshot
// } from "@angular/router";
// import { AuthService } from "../services/auth.service";

// export const isAuth: CanActivateFn | CanActivateChildFn = (
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
// ) => {
//     const authService = inject(AuthService);
//     const router = inject(Router);
//     const resp = authService.getLoggedInUser();
//     if (!resp) {
//         router.navigate(["/"]);
//         return false;
//     }
//     return true;
// };

// export const isAuthChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//     const authService = inject(AuthService);
//     const router = inject(Router);
//     const result = authService.getLoggedInUser();
//     if (!result) {
//         router.navigate(["/"]);
//         return false;
//     }
//     return true;
// };

import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"
import { Observable, map } from "rxjs"
import { AuthService } from "../services/auth.service"

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(): Observable<boolean> {
        return this.authService.isLoggedIn.pipe(
            map((isLoggedIn) => {
                if (!isLoggedIn) {
                    this.router.navigate(["/login"])
                    return false
                }
                return true
            })
        )
    }
}
