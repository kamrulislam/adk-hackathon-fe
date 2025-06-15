import { Component, OnInit } from "@angular/core"
import { RouterLink } from "@angular/router"
import { ButtonModule } from "primeng/button"

@Component({
    selector: "app-landing-page",
    templateUrl: "./landing-page.component.html",
    styleUrls: ["./landing-page.component.scss"],
    standalone: true,
    imports: [RouterLink, ButtonModule]
})
export class LandingPageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
