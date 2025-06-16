import { CommonModule } from "@angular/common"
import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { Patient } from "../../models/patient.model"
import { AuthService } from "../../services/auth.service"
import { PatientService } from "../../services/patient.service"

// PrimeNG Imports
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { DividerModule } from "primeng/divider"
import { PanelModule } from "primeng/panel"
import { TagModule } from "primeng/tag"

@Component({
    selector: "app-patient-detail",
    standalone: true,
    imports: [
        CommonModule,
        CardModule,
        ButtonModule,
        PanelModule,
        DividerModule,
        TagModule
    ],
    templateUrl: "./patient-detail.component.html",
    styleUrls: ["./patient-detail.component.scss"]
})
export class PatientDetailComponent implements OnInit {
    patient: Patient | null = null
    loading = true

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private patientService: PatientService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        const patientId = this.route.snapshot.paramMap.get("id")
        if (patientId) {
            this.loadPatient(patientId)
        }
    }

    loadPatient(id: string) {
        this.patientService.getPatient(id).subscribe((patient) => {
            this.patient = patient || null
            this.loading = false
        })
    }

    goBack() {
        this.router.navigate(["/patients"])
    }

    viewPathologyReport() {
        if (this.patient) {
            alert(`Pathology report for ${this.patient.name} would open here`)
        }
    }

    logout() {
        this.authService.logout()
        this.router.navigate(["/login"])
    }

    // Add these methods if they don't exist:
    addNote() {
        // TODO: Implement logic to add a note for the patient
        console.log("Add Note clicked")
    }

    editPatient() {
        // TODO: Implement logic to edit patient details
        console.log("Edit Patient clicked")
    }

    deletePatient() {
        // TODO: Implement logic to delete the patient
        console.log("Delete Patient clicked")
    }
}
