import { Routes } from "@angular/router"
import { AuthComponent } from "./auth.component"

export const AUTH_ROUTES: Routes = [
    {
        path: "",
        component: AuthComponent,
        children: [
            {
                path: "login",
                loadComponent: () =>
                    import("./login/login.component").then(
                        (m) => m.LoginComponent
                    )
            },
            {
                path: "signup",
                loadComponent: () =>
                    import("./signup/signup.component").then(
                        (m) => m.SignupComponent
                    )
            },
            { path: "", pathMatch: "full", redirectTo: "login" }
        ]
    }
]
