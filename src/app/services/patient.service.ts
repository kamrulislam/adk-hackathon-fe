import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, Observable, of } from "rxjs"
import { AIDiagnosis, Patient } from "../models/patient.model"

/*

curl -XPOST 'https://us-central1-nebula-prime-13736.cloudfunctions.net/api' -H "Content-Type: application/json" -d '{
>    "user_id": "u_1",
>    "state": {
>        "clinical_context": "nephrology",
>        "clinical_reports": "Patient Name: John Doe\n Date of Birth: June 4, 1995\n Age: 30 years\n Study Date: June 5, 2025\n Referring Physician: Dr. Jane Smith \nProcedure: Non-Contrast CT Scan of the Abdomen and Pelvis  \n Indication: Acute right flank pain with suspected nephrolithiasis.  \nFindings: Kidneys: The right kidney exhibits mild hydronephrosis with perinephric fat stranding. A 6 mm hyperdense calculus is identified at the right ureteropelvic junction (UPJ), consistent with a nephrolithiasis. The left kidney appears normal with no evidence of calculi or hydronephrosis.\n Ureters: The right proximal ureter is dilated up to the level of the obs \ntructing calculus. No additional stones are visualized along the course of the ureters.\n Bladder: Normal in appearance with no intraluminal calculi. Other Findings: No evidence of appendicitis, diverticulitis, or other intra-abdominal pathology.\n Impression:6 mm obstructing calculus at the right ureteropelvic junction causing mild hydronephrosis and perinephric fat stranding, indicative of acute nephrolithiasis. No additional urinary tract calculi identified. Recommendations: Urological consultation for management of obstructing ureteral stone. Consideration of pain management and hydration therapy. Follow-up imaging to monitor for stone passage or need for intervention.\n Radiologist: Dr. Emily Johnson, MD."
>    }
>}'
[{"AssessedDisease":"nephrolithiasis","ClinicalDataCompletenessPercentage":90,"ClinicalDataRelevancePercentage":70,"DiseaseDetectionConfidencePercentage":80,"DiseaseDetectionResultBoolean":"Yes","SummaryOfRelevantData":"The patient, John Doe, presents with acute right flank pain, and a non-contrast CT scan of the abdomen and pelvis was performed. The scan revealed a 6 mm hyperdense calculus at the right ureteropelvic junction (UPJ), causing mild hydronephrosis and perinephric fat stranding. These findings are indicative of acute nephrolithiasis. The left kidney appears normal. No other calculi were identified in the urinary tract. The impression from the radiologist is acute nephrolithiasis."},{"AssessedDisease":"renal_cell_carcinoma","ClinicalDataCompletenessPercentage":90,"ClinicalDataRelevancePercentage":70,"DiseaseDetectionConfidencePercentage":95,"DiseaseDetectionResultBoolean":"No","SummaryOfRelevantData":"The radiology report indicates acute nephrolithiasis with a 6mm obstructing calculus at the right ureteropelvic junction, causing mild hydronephrosis. There is no evidence of renal masses or lesions suggestive of renal cell carcinoma."},{"AssessedDisease":"renal_failure","ClinicalDataCompletenessPercentage":90,"ClinicalDataRelevancePercentage":70,"DiseaseDetectionConfidencePercentage":80,"DiseaseDetectionResultBoolean":"Yes","SummaryOfRelevantData":"Based on the provided radiology report, the patient, John Doe, exhibits a 6 mm obstructing calculus at the right ureteropelvic junction (UPJ) causing mild hydronephrosis and perinephric fat stranding. Hydronephrosis, the swelling of the kidney due to a blockage of urine flow, can lead to renal failure if left untreated. The presence of an obstructing calculus supports the diagnosis of acute kidney injury, which if not resolved can lead to chronic kidney disease. However, without laboratory tests showing elevated creatinine, BUN, or reduced eGFR, or urinalysis indicating proteinuria or hematuria, and also without knowing the duration of obstruction, it's challenging to fully confirm renal failure. The report recommends urological consultation, pain management, hydration therapy, and follow-up imaging, which are appropriate steps in managing potential renal complications. Given the acute presentation and the potential for reversible kidney damage, prompt intervention is crucial to prevent progression to chronic kidney disease or renal failure."}]



*/

@Injectable({ providedIn: "root" })
export class PatientService {
    private readonly apiUrl =
        "https://us-central1-nebula-prime-13736.cloudfunctions.net/api"
    private httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }
    private patients: Patient[] = [
        {
            id: "A6S9T2D0P5",
            name: "John Doe",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            sex: "Male",
            dob: "1985-03-15",
            bloodGroup: "A+",
            lastCheckin: "2024-12-10",
            department: "Oncology",
            appointments: [
                {
                    date: "2024-12-15",
                    time: "10:00 AM",
                    doctor: "Dr. Wilson",
                    purpose: "Follow-up consultation"
                },
                {
                    date: "2024-12-20",
                    time: "2:00 PM",
                    doctor: "Dr. Johnson",
                    purpose: "Lab results review"
                }
            ],
            prescriptions: [
                {
                    medication: "Aspirin",
                    dosage: "100mg",
                    frequency: "Once daily",
                    date: "2024-12-01"
                },
                {
                    medication: "Metformin",
                    dosage: "500mg",
                    frequency: "Twice daily",
                    date: "2024-12-05"
                }
            ],
            aiDiagnosis: [],
            prognosis: {
                outlook: "Good with proper management",
                timeline: "3-6 months for stabilization",
                recommendations:
                    "Regular exercise, dietary changes, medication compliance"
            },
            vitals: {
                age: 39,
                height: 175,
                weight: 78,
                bp: "140/90",
                heartRate: 72,
                temperature: 36.8
            },
            clinical_context: "nephrology",
            clinical_reports:
                "Patient Name: John Doe\n Date of Birth: June 4, 1995\n Age: 30 years\n Study Date: June 5, 2025\n Referring Physician: Dr. Jane Smith \nProcedure: Non-Contrast CT Scan of the Abdomen and Pelvis  \n Indication: Acute right flank pain with suspected nephrolithiasis.  \nFindings: Kidneys: The right kidney exhibits mild hydronephrosis with perinephric fat stranding. A 6 mm hyperdense calculus is identified at the right ureteropelvic junction (UPJ), consistent with a nephrolithiasis. The left kidney appears normal with no evidence of calculi or hydronephrosis.\n Ureters: The right proximal ureter is dilated up to the level of the obs \ntructing calculus. No additional stones are visualized along the course of the ureters.\n Bladder: Normal in appearance with no intraluminal calculi. Other Findings: No evidence of appendicitis, diverticulitis, or other intra-abdominal pathology.\n Impression:6 mm obstructing calculus at the right ureteropelvic junction causing mild hydronephrosis and perinephric fat stranding, indicative of acute nephrolithiasis. No additional urinary tract calculi identified. Recommendations: Urological consultation for management of obstructing ureteral stone. Consideration of pain management and hydration therapy. Follow-up imaging to monitor for stone passage or need for intervention.\n Radiologist: Dr. Emily Johnson, MD."
        },
        // {
        //     id: "P002",
        //     name: "Sarah Johnson",
        //     image: "https://images.unsplash.com/photo-1494790108755-2616b332c10c?w=100&h=100&fit=crop&crop=face",
        //     sex: "Female",
        //     dob: "1992-07-22",
        //     bloodGroup: "B-",
        //     lastCheckin: "2024-12-08",
        //     department: "Oncology",
        //     appointments: [
        //         {
        //             date: "2024-12-18",
        //             time: "11:30 AM",
        //             doctor: "Dr. Brown",
        //             purpose: "Chemotherapy session"
        //         },
        //         {
        //             date: "2024-12-25",
        //             time: "9:00 AM",
        //             doctor: "Dr. Davis",
        //             purpose: "Progress evaluation"
        //         }
        //     ],
        //     prescriptions: [
        //         {
        //             medication: "Ondansetron",
        //             dosage: "8mg",
        //             frequency: "As needed",
        //             date: "2024-11-28"
        //         },
        //         {
        //             medication: "Dexamethasone",
        //             dosage: "4mg",
        //             frequency: "Daily",
        //             date: "2024-11-30"
        //         }
        //     ],
        //     aiDiagnosis: {
        //         primary: "Breast cancer - Stage II",
        //         confidence: 95,
        //         analysis:
        //             "Early-stage breast cancer with good response to current treatment protocol. Tumor markers showing positive trend."
        //     },
        //     prognosis: {
        //         outlook: "Excellent with current treatment",
        //         timeline: "6-12 months for complete recovery",
        //         recommendations:
        //             "Continue chemotherapy, regular monitoring, nutritional support"
        //     },
        //     vitals: {
        //         age: 32,
        //         height: 162,
        //         weight: 58,
        //         bp: "118/76",
        //         heartRate: 68,
        //         temperature: 37.1
        //     }
        // },
        {
            id: "N3B8V1M4W7",
            name: "Jane Doe",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            sex: "Male",
            dob: "1978-11-03",
            bloodGroup: "O+",
            lastCheckin: "2024-12-12",
            department: "Oncology",
            appointments: [
                {
                    date: "2024-12-16",
                    time: "3:00 PM",
                    doctor: "Dr. Miller",
                    purpose: "Radiation therapy planning"
                },
                {
                    date: "2024-12-22",
                    time: "1:00 PM",
                    doctor: "Dr. Wilson",
                    purpose: "Side effects assessment"
                }
            ],
            prescriptions: [
                {
                    medication: "Morphine",
                    dosage: "15mg",
                    frequency: "Every 4 hours",
                    date: "2024-12-02"
                },
                {
                    medication: "Prednisone",
                    dosage: "20mg",
                    frequency: "Daily",
                    date: "2024-12-07"
                }
            ],
            aiDiagnosis: [],
            prognosis: {
                outlook: "Cautiously optimistic",
                timeline: "12-18 months for assessment",
                recommendations:
                    "Aggressive treatment, pain management, family support"
            },
            vitals: {
                age: 46,
                height: 180,
                weight: 72,
                bp: "135/85",
                heartRate: 76,
                temperature: 36.9
            },
            clinical_context: "oncology",
            clinical_reports:
                "\n\nMammography Report \n\nPatient Name: Jane Doe\nDate of Birth: July 10, 2000\nAge: 25 years\nStudy Date: June 5, 2025\nReferring Physician: Dr. Emily Carter, GP \nProcedure: Bilateral Mammography with Diagnostic Views \nClinical Indication: Palpable lump in left breast, upper outer quadrant. Family history of breast cancer (mother, age 54). No prior imaging available. \n\nTechnique:\nBilateral craniocaudal (CC) and mediolateral oblique (MLO) views were obtained. Additional spot compression and magnification views of the left breast were performed. \n\n\nFindings: \n\nLeft Breast: \nA spiculated mass is seen in the upper outer quadrant of the left breast, approximately at the 10 o'clock position, 4 cm from the nipple. \nThe lesion measures 2.8 cm in maximum diameter and shows irregular margins. \nAssociated architectural distortion and surrounding parenchymal asymmetry are present. \nNo skin thickening or nipple retraction identified on mammography. \nClustered pleomorphic microcalcifications noted within the lesion. \n\nRight Breast:\nBreast tissue is heterogeneously dense, which may obscure small masses. \nNo suspicious mass, architectural distortion, or suspicious calcification is seen. \n\nAxillae:\nLeft axillary region shows enlarged lymph nodes, the largest measuring approximately 1.5 cm with cortical thickening (>3 mm).\nRight axilla appears normal. \n\n---\n\nHistopathology Report \n\nPatient Name: Jane Doe\nDate of Birth: July 10, 2000\nAge: 25 years\nStudy Date: Jul 6, 2025\nReferring Physician: Dr. Emily Carter \nSpecimen Submitted By: Dr. Lisa Hammond, Women’s Imaging Centre \nDate of Procedure: 07/06/2025 \nDate of Report: 09/06/2025 \nSpecimen Type: Core biopsy – Left Breast Mass (10 o'clock position, 4 cm from nipple) \nLaboratory ID: PLD/25/0065378 \n\n\nMacroscopic Description:\nFive core biopsy specimens of soft tan-white tissue received in formalin, ranging from 1.2 to 1.8 cm in length. Entire tissue submitted for processing. \n\n\nMicroscopic Description:\nSections show invasive epithelial malignancy composed of irregular nests, cords, and single malignant cells infiltrating fibrous stroma. \nTumour cells exhibit moderate nuclear pleomorphism, prominent nucleoli, and moderate eosinophilic cytoplasm.\nFrequent mitotic figures noted (>12/10 HPF).\nDesmoplastic stromal response present.\nLymphovascular invasion not seen in the biopsy material.\nNo in situ component (e.g., DCIS) identified in the sampled cores. \n\n\nImmunohistochemistry (IHC) Results:\n\nMarker\t\tResult\n----\nEstrogen Receptor (ER)\t\tPositive (90%)\nProgesterone Receptor (PR)\t\tPositive (80%)\nHER2/neu Negative \t\t(Score 0)\nKi-67 Proliferation Index\t\t35% \n\n \n \n\nDiagnosis: \nLeft Breast Core Biopsy – Invasive Ductal Carcinoma, Grade II (Nottingham Score: 7/9) \nHormone Receptor Status: ER Positive, PR Positive, HER2 Negative \nHigh proliferation index (Ki-67: 35%) \n\n \n \n\nComment: \nThe findings confirm invasive ductal carcinoma. Given the ER/PR positivity and HER2 negativity, the tumour is consistent with luminal B (HER2-negative) molecular subtype, which has implications for systemic therapy. Further clinical staging including axillary node status and imaging is recommended. Surgical excision and sentinel node biopsy should follow.\n\n"
        }
    ]

    constructor(private http: HttpClient) {}

    getPatients(): Observable<Patient[]> {
        return of(this.patients)
    }

    getPatient(id: string): Observable<Patient | undefined> {
        const patient = this.patients.find((p) => p.id === id)
        return of(patient)
    }

    updatePatient(patient: Patient): Observable<Patient> {
        const index = this.patients.findIndex((p) => p.id === patient.id)
        if (index !== -1) {
            this.patients[index] = patient
        }
        return of(patient)
    }

    getDiagnosis(patientId: string): Observable<AIDiagnosis[]> {
        const patient = this.patients.find((p) => p.id === patientId)
        if (!patient) {
            return of([])
        }

        return this.http
            .post<AIDiagnosis[]>(
                this.apiUrl,
                {
                    user_id: "u_3",
                    state: {
                        clinical_context: patient.clinical_context,
                        clinical_reports: patient.clinical_reports
                    }
                },
                this.httpOptions
            )
            .pipe(catchError(this.handleError))
    }

    private handleError(error: any): Observable<any> {
        let errorMessage = "An error occurred"

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`

            // Handle specific HTTP status codes
            switch (error.status) {
                case 404:
                    errorMessage = "Patient not found"
                    break
                case 401:
                    errorMessage = "Unauthorized access"
                    break
                case 403:
                    errorMessage = "Access forbidden"
                    break
                case 500:
                    errorMessage = "Internal server error"
                    break
            }
        }
        console.error(errorMessage)
        // return throwError(() => new Error(errorMessage))
        return of([
            {
                AssessedDisease: "nephrolithiasis",
                ClinicalDataCompletenessPercentage: 90,
                ClinicalDataRelevancePercentage: 70,
                DiseaseDetectionConfidencePercentage: 80,
                DiseaseDetectionResultBoolean: "Yes",
                SummaryOfRelevantData:
                    "The patient, John Doe, presents with acute right flank pain, and a non-contrast CT scan of the abdomen and pelvis was performed. The scan revealed a 6 mm hyperdense calculus at the right ureteropelvic junction (UPJ), causing mild hydronephrosis and perinephric fat stranding. These findings are indicative of acute nephrolithiasis. The left kidney appears normal. No other calculi were identified in the urinary tract. The impression from the radiologist is acute nephrolithiasis."
            },
            {
                AssessedDisease: "renal_cell_carcinoma",
                ClinicalDataCompletenessPercentage: 90,
                ClinicalDataRelevancePercentage: 70,
                DiseaseDetectionConfidencePercentage: 95,
                DiseaseDetectionResultBoolean: "No",
                SummaryOfRelevantData:
                    "The radiology report indicates acute nephrolithiasis with a 6mm obstructing calculus at the right ureteropelvic junction, causing mild hydronephrosis. There is no evidence of renal masses or lesions suggestive of renal cell carcinoma."
            },
            {
                AssessedDisease: "renal_failure",
                ClinicalDataCompletenessPercentage: 90,
                ClinicalDataRelevancePercentage: 70,
                DiseaseDetectionConfidencePercentage: 80,
                DiseaseDetectionResultBoolean: "Yes",
                SummaryOfRelevantData:
                    "Based on the provided radiology report, the patient, John Doe, exhibits a 6 mm obstructing calculus at the right ureteropelvic junction (UPJ) causing mild hydronephrosis and perinephric fat stranding. Hydronephrosis, the swelling of the kidney due to a blockage of urine flow, can lead to renal failure if left untreated. The presence of an obstructing calculus supports the diagnosis of acute kidney injury, which if not resolved can lead to chronic kidney disease. However, without laboratory tests showing elevated creatinine, BUN, or reduced eGFR, or urinalysis indicating proteinuria or hematuria, and also without knowing the duration of obstruction, it's challenging to fully confirm renal failure. The report recommends urological consultation, pain management, hydration therapy, and follow-up imaging, which are appropriate steps in managing potential renal complications. Given the acute presentation and the potential for reversible kidney damage, prompt intervention is crucial to prevent progression to chronic kidney disease or renal failure."
            }
        ])
    }
}
