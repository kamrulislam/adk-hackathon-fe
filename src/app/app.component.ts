import { CommonModule } from "@angular/common"
import { Component, inject } from "@angular/core"
import { FormsModule } from "@angular/forms"
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterOutlet
} from "@angular/router"
import { definePreset } from "@primeng/themes"
import Aura from "@primeng/themes/aura"
import { ConfirmationService, MessageService } from "primeng/api"
import { AvatarModule } from "primeng/avatar"
import { AvatarGroupModule } from "primeng/avatargroup"
import { ButtonModule } from "primeng/button"
import { PrimeNG } from "primeng/config"
import { ConfirmDialog } from "primeng/confirmdialog"
import { InputTextModule } from "primeng/inputtext"
import { MenubarModule } from "primeng/menubar"
import { ToastModule } from "primeng/toast"
import { ToggleSwitch } from "primeng/toggleswitch"
import { filter, map, Observable } from "rxjs"

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: "{indigo.50}",
            100: "{indigo.100}",
            200: "{indigo.200}",
            300: "{indigo.300}",
            400: "{indigo.400}",
            500: "{indigo.500}",
            600: "{indigo.600}",
            700: "{indigo.700}",
            800: "{indigo.800}",
            900: "{indigo.900}",
            950: "{indigo.950}"
        }
    }
})

@Component({
    selector: "app-root",
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        ToggleSwitch,
        ConfirmDialog,
        ToastModule,
        MenubarModule,
        AvatarModule,
        AvatarGroupModule,
        RouterOutlet
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
    providers: [ConfirmationService, MessageService]
})
export class AppComponent {
    value: string = ""
    checked = true
    public config: PrimeNG = inject(PrimeNG)
    private confirmationService: ConfirmationService =
        inject(ConfirmationService)
    private messageService: MessageService = inject(MessageService)
    title = "NebulaPrime"
    showNav$: Observable<boolean>

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.showNav$ = this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map((event) => {
                console.log(
                    event.url,
                    !(event.url.endsWith("/") || event.url.endsWith("login"))
                )
                return !(event.url.endsWith("/") || event.url.endsWith("login"))
            })
        )
        // Default theme configuration
        this.config.theme.set({
            preset: MyPreset,
            options: {
                darkModeSelector: ".dark",
                cssLayer: {
                    name: "primeng",
                    order: "tailwind-base, primeng, tailwind-utilities"
                }
            }
        })
    }

    onSubmit() {
        console.log(this.value)
    }

    onCheckedChange() {
        this.checked = !this.checked
    }

    confirm1(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: "Are you sure that you want to proceed?",
            header: "Confirmation",
            closable: true,
            closeOnEscape: true,
            icon: "pi pi-exclamation-triangle",
            rejectButtonProps: {
                label: "Cancel",
                severity: "secondary",
                outlined: true
            },
            acceptButtonProps: {
                label: "Save"
            },
            accept: () => {
                console.log("I am here")
                this.messageService.add({
                    severity: "info",
                    summary: "Confirmed",
                    detail: "You have accepted"
                })
            },
            reject: () => {
                this.messageService.add({
                    severity: "error",
                    summary: "Rejected",
                    detail: "You have rejected",
                    life: 3000
                })
            }
        })
    }

    updateTitle() {
        this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Test is a error"
        })
        this.title = this.value
    }
}
