import { Routes } from "@angular/router"
import { PatientListComponent } from "../components/patient-list/patient-list.component"
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
            { path: "patients", component: PatientListComponent },

            { path: "", pathMatch: "full", redirectTo: "login" }
        ]
    }
]
