import { Routes } from "@angular/router"

export const routes: Routes = [
    {
        path: "public",
        loadChildren: () =>
            import("./public/public-routing.module").then(
                (m) => m.PUBLIC_ROUTES
            )
    },
    {
        path: "auth",
        loadChildren: () =>
            import("./auth/auth-routing.module").then((m) => m.AUTH_ROUTES)
    },
    { path: "", redirectTo: "public", pathMatch: "full" }
]
