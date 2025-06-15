import {
    ApplicationConfig,
    importProvidersFrom,
    provideZoneChangeDetection
} from "@angular/core"
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import { provideRouter } from "@angular/router"

import { provideHttpClient, withInterceptors } from "@angular/common/http"
import {
    getAnalytics,
    provideAnalytics,
    ScreenTrackingService,
    UserTrackingService
} from "@angular/fire/analytics"
import { AngularFireModule } from "@angular/fire/compat"
import { environment } from "../environments/environment"
import { routes } from "./app.routes"
import { authInterceptor } from "./guards/auth.interceptor"

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimationsAsync(),
        importProvidersFrom(
            AngularFireModule.initializeApp(environment.firebase)
        ),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideAnalytics(() => getAnalytics()),
        ScreenTrackingService,
        UserTrackingService
    ]
}
