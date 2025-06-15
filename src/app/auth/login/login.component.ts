import { CommonModule } from "@angular/common"
import { Component, OnInit } from "@angular/core"
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import { MessageService } from "primeng/api"
import { ButtonModule } from "primeng/button"
import { CheckboxModule } from "primeng/checkbox"
import { InputTextModule } from "primeng/inputtext"
import { PasswordModule } from "primeng/password"
import { ProgressBarModule } from "primeng/progressbar"
import { AuthService } from "../../services/auth.service"

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        ProgressBarModule,
        RouterLink,
        CheckboxModule
    ]
})
export class LoginComponent implements OnInit {
    form: FormGroup
    isSubmitLoading: boolean = false

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) {
        this.form = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required]
        })
    }

    ngOnInit() {}

    async onSubmit() {
        try {
            this.isSubmitLoading = true
            await this.authService.login(
                this.form.value.email,
                this.form.value.password
            )
            this.isSubmitLoading = false
            this.router.navigate(["/admin"])
        } catch (err: any) {
            const obj = {
                severity: "error",
                summary: "Error",
                detail: err.message
            }
            this.messageService.add(obj)
            this.isSubmitLoading = false
        }
    }
}
