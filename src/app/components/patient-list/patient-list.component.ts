import { CommonModule } from "@angular/common"
import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { Patient } from "../../models/patient.model"
import { AuthService } from "../../services/auth.service"
import { PatientService } from "../../services/patient.service"

// PrimeNG Imports
import { MenuItem } from "primeng/api"
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { MenubarModule } from "primeng/menubar"

@Component({
    selector: "app-patient-list",
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, MenubarModule],
    templateUrl: "./patient-list.component.html",
    styleUrls: ["./patient-list.component.scss"]
})
export class PatientListComponent implements OnInit {
    patients: Patient[] = []
    menuItems: MenuItem[] = []

    constructor(
        private patientService: PatientService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadPatients()
        this.setupMenu()
    }

    loadPatients() {
        this.patientService.getPatients().subscribe((patients) => {
            this.patients = patients
        })
    }

    setupMenu() {
        this.menuItems = [
            {
                label: "MedCare System",
                icon: "pi pi-hospital",
                styleClass: "navbar-brand"
            },
            { label: "Patients", icon: "pi pi-users" },
            {
                label: "Logout",
                icon: "pi pi-sign-out",
                command: () => this.logout()
            }
        ]
    }

    viewDetail(patient: Patient) {
        this.router.navigate(["/patient", patient.id])
    }

    editPatient(patient: Patient) {
        // Implement edit functionality
        console.log("Edit patient:", patient.name)
    }

    quickDetail(patient: Patient) {
        alert(
            `Quick info for ${patient.name}:\nID: ${patient.id}\nDepartment: ${patient.department}\nLast Check-in: ${patient.lastCheckin}`
        )
    }

    logout() {
        this.authService.logout()
        this.router.navigate(["/login"])
    }
}
