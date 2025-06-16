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
    aiDiagnosis: AIDiagnosis
    prognosis: Prognosis
    vitals: Vitals
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
    primary: string
    confidence: number
    analysis: string
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
