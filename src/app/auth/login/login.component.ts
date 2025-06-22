import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { AuthService } from "../../services/auth.service"

// PrimeNG Imports
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { DropdownModule } from "primeng/dropdown"
import { InputTextModule } from "primeng/inputtext"
import { MessageModule } from "primeng/message"
import { PasswordModule } from "primeng/password"

@Component({
    selector: "app-login",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        CardModule,
        InputTextModule,
        PasswordModule,
        DropdownModule,
        ButtonModule,
        MessageModule
    ],
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
    loginData = { username: "test", password: "test", specialty: "oncology" }

    specialties = [
        { label: "Select Specialty", value: "" },
        { label: "Oncology", value: "oncology" },
        { label: "Cardiology", value: "cardiology" },
        { label: "Neurology", value: "neurology" },
        { label: "Pediatrics", value: "pediatrics" }
    ]

    errorMessage = ""

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onLogin() {
        if (
            this.authService.login(
                this.loginData.username,
                this.loginData.password,
                this.loginData.specialty
            )
        ) {
            this.router.navigate(["/patients"])
        } else {
            this.errorMessage = "Please fill in all fields"
        }
    }
}
