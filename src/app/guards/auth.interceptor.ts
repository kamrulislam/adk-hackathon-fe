import {
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest
} from "@angular/common/http"
import { inject } from "@angular/core"
import { AngularFireAuth } from "@angular/fire/compat/auth"
import { Observable, first, switchMap } from "rxjs"

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const angularFireAuth = inject(AngularFireAuth)

    return angularFireAuth.idToken.pipe(
        first(),
        switchMap((idToken) => {
            if (idToken) {
                const modifiedRequest = req.clone({
                    setHeaders: { Authorization: `Bearer ${idToken}` }
                })
                return next(modifiedRequest)
            } else {
                return next(req)
            }
        })
    )
}
