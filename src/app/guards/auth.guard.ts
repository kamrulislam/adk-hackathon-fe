import { inject } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivateChildFn,
    CanActivateFn,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../services/auth.service";

export const isAuth: CanActivateFn | CanActivateChildFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const resp = authService.getLoggedInUser();
    if (!resp) {
        router.navigate(["/"]);
        return false;
    }
    return true;
};

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
