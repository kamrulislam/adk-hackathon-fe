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
import { ProgressBarModule } from "primeng/progressbar"
import { ProgressSpinnerModule } from "primeng/progressspinner"
import { TagModule } from "primeng/tag"

@Component({
    selector: "app-patient-ai-diagnosis-detail",
    standalone: true,
    imports: [
        CommonModule,
        CardModule,
        ButtonModule,
        PanelModule,
        DividerModule,
        ProgressSpinnerModule,
        ProgressBarModule,
        TagModule
    ],
    templateUrl: "./patient-ai-diagnosis-detail.component.html",
    styleUrls: ["./patient-ai-diagnosis-detail.component.scss"]
})
export class PatientAiDiagnosisDetailComponent implements OnInit {
    patient: Patient | null = null
    loading = true
    diagnosisMap = {
        nephrolithiasis: "Nephrolithiasis (Kidney Stones)",
        renal_cell_carcinoma: "Renal Cell Carcinoma",
        renal_failure: "Renal Failure"
    }

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
        this.loading = true
        this.patientService.getPatient(id).subscribe((patient) => {
            this.patient = patient || null
            // this.loading = false
        })

        this.patientService.getDiagnosis(id).subscribe({
            next: (diagnosis) => {
                if (this.patient) {
                    console.log("AI Diagnosis:", diagnosis)
                    this.patient.aiDiagnosis = diagnosis
                }
                this.loading = false
            },
            error: (error) => {
                console.error("Error fetching diagnosis:", error)
                // this.patient = null
                // this.loading = false
            }
        })
    }

    goBack() {
        this.router.navigate(["/patient", this.patient?.id!])
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
