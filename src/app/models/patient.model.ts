export interface Patient {
    id: string
    name: string
    image: string
    sex: string
    dob: string
    bloodGroup: string
    lastCheckin: string
    department: string
    appointments: Appointment[]
    prescriptions: Prescription[]
    aiDiagnosis: AIDiagnosis[]
    prognosis: Prognosis
    vitals: Vitals
    clinical_context: string
    clinical_reports: string
}

export interface Appointment {
    date: string
    time: string
    doctor: string
    purpose: string
}

export interface Prescription {
    medication: string
    dosage: string
    frequency: string
    date: string
}

export interface AIDiagnosis {
    AssessedDisease:
        | "nephrolithiasis"
        | "renal_cell_carcinoma"
        | "renal_failure"
        | "colon_cancer"
        | "brain_cancer"
        | "lung_cancer"
        | "breast_cancer"
        | "prostate_cancer"
        | "diabetes"
        | "hypertension"
        | "asthma"
        | "heart_disease"
        | "stroke"
        | "arthritis"
        | "osteoporosis"
        | "alzheimers"
        | "parkinsons"
    AssessedDiseaseName: string
    ClinicalDataCompletenessPercentage: number
    ClinicalDataRelevancePercentage: number
    DiseaseDetectionConfidencePercentage: number
    DiseaseDetectionResultBoolean: "Yes" | "No"
    SummaryOfRelevantData: string
}

export interface Prognosis {
    outlook: string
    timeline: string
    recommendations: string
}

export interface Vitals {
    age: number
    height: number
    weight: number
    bp: string
    heartRate: number
    temperature: number
}

export interface Doctor {
    username: string
    specialty: string
}
