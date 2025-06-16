import { Routes } from "@angular/router"
import { PatientListComponent } from "./components/patient-list/patient-list.component"
import { AuthGuard } from "./guards/auth.guard"

export const routes: Routes = [
    {
        path: "public",
        loadChildren: () =>
            import("./public/public-routing.module").then(
                (m) => m.PUBLIC_ROUTES
            )
    },

    {
        path: "patients",
        component: PatientListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "auth",
        loadChildren: () =>
            import("./auth/auth-routing.module").then((m) => m.AUTH_ROUTES)
    },
    { path: "", redirectTo: "auth", pathMatch: "full" }
]
