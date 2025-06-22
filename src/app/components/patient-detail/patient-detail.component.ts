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
    selector: "app-patient-detail",
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
    templateUrl: "./patient-detail.component.html",
    styleUrls: ["./patient-detail.component.scss"]
})
export class PatientDetailComponent implements OnInit {
    patient: Patient | null = null
    loading = true
    state: "Details" | "AI" = "Details"
    diagnosisMap = {
        nephrolithiasis: "Nephrolithiasis (Kidney Stones)",
        renal_cell_carcinoma: "Renal Cell Carcinoma",
        renal_failure: "Renal Failure",
        colon_cancer: "Colon Cancer",
        brain_cancer: "Brain Cancer",
        lung_cancer: "Lung Cancer",
        breast_cancer: "Breast Cancer",
        prostate_cancer: "Prostate Cancer",
        diabetes: "Diabetes",
        hypertension: "Hypertension",
        asthma: "Asthma",
        heart_disease: "Heart Disease",
        stroke: "Stroke",
        arthritis: "Arthritis",
        osteoporosis: "Osteoporosis",
        alzheimers: "Alzheimer's Disease",
        parkinsons: "Parkinson's Disease",
        multiple_sclerosis: "Multiple Sclerosis"
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
        if (this.state === "AI") {
            this.state = "Details"
        } else {
            this.router.navigate(["/patients"])
        }
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

    goToAiDiagnosis() {
        if (this.patient) {
            // this.router.navigate(["/patient", this.patient.id, "diagnosis"])
            this.state = "AI"
        }
    }
}
