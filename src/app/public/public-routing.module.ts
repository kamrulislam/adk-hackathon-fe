import { Routes } from "@angular/router"

export const PUBLIC_ROUTES: Routes = [
    {
        path: "landing-page",
        loadComponent: () =>
            import("./landing-page/landing-page.component").then(
                (m) => m.LandingPageComponent
            )
    },
    { path: "", redirectTo: "landing-page", pathMatch: "full" }
]
