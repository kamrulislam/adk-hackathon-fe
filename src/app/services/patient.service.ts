import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { Patient } from "../models/patient.model"

@Injectable({ providedIn: "root" })
export class PatientService {
    private patients: Patient[] = [
        {
            id: "P001",
            name: "John Smith",
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
            aiDiagnosis: {
                primary: "Hypertension with diabetes mellitus",
                confidence: 92,
                analysis:
                    "Patient shows consistent elevated blood pressure readings with glucose intolerance. Recommend lifestyle modifications and medication adjustment."
            },
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
            }
        },
        {
            id: "P002",
            name: "Sarah Johnson",
            image: "https://images.unsplash.com/photo-1494790108755-2616b332c10c?w=100&h=100&fit=crop&crop=face",
            sex: "Female",
            dob: "1992-07-22",
            bloodGroup: "B-",
            lastCheckin: "2024-12-08",
            department: "Oncology",
            appointments: [
                {
                    date: "2024-12-18",
                    time: "11:30 AM",
                    doctor: "Dr. Brown",
                    purpose: "Chemotherapy session"
                },
                {
                    date: "2024-12-25",
                    time: "9:00 AM",
                    doctor: "Dr. Davis",
                    purpose: "Progress evaluation"
                }
            ],
            prescriptions: [
                {
                    medication: "Ondansetron",
                    dosage: "8mg",
                    frequency: "As needed",
                    date: "2024-11-28"
                },
                {
                    medication: "Dexamethasone",
                    dosage: "4mg",
                    frequency: "Daily",
                    date: "2024-11-30"
                }
            ],
            aiDiagnosis: {
                primary: "Breast cancer - Stage II",
                confidence: 95,
                analysis:
                    "Early-stage breast cancer with good response to current treatment protocol. Tumor markers showing positive trend."
            },
            prognosis: {
                outlook: "Excellent with current treatment",
                timeline: "6-12 months for complete recovery",
                recommendations:
                    "Continue chemotherapy, regular monitoring, nutritional support"
            },
            vitals: {
                age: 32,
                height: 162,
                weight: 58,
                bp: "118/76",
                heartRate: 68,
                temperature: 37.1
            }
        },
        {
            id: "P003",
            name: "Michael Davis",
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
            aiDiagnosis: {
                primary: "Lung cancer - Stage IIIA",
                confidence: 88,
                analysis:
                    "Locally advanced non-small cell lung cancer. Patient responding well to combination therapy. Consider surgical evaluation."
            },
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
            }
        }
    ]

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
}
