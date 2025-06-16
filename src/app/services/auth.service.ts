// import { inject, Injectable } from "@angular/core"
// import { UserCredential } from "@angular/fire/auth"
// import { AngularFireAuth } from "@angular/fire/compat/auth"

// @Injectable({
//     providedIn: "root"
// })
// export class AuthService {
//     private fireAuth = inject(AngularFireAuth)

//     getLoggedInUser(): UserCredential | null {
//         const jsonUser = localStorage.getItem("user")
//         return jsonUser ? JSON.parse(jsonUser) : null
//     }

//     async login(email: string, password: string) {
//         try {
//             const resp = await this.fireAuth.signInWithEmailAndPassword(
//                 email,
//                 password
//             )
//             localStorage.setItem("user", JSON.stringify(resp))
//             return resp
//         } catch (err: any) {
//             throw new Error(err.message)
//         }
//     }

//     async signup(email: string, password: string) {
//         try {
//             const resp = await this.fireAuth.createUserWithEmailAndPassword(
//                 email,
//                 password
//             )
//             localStorage.setItem("user", JSON.stringify(resp))
//             return resp
//         } catch (err: any) {
//             throw new Error(err.message)
//         }
//     }

//     async logout() {
//         await this.fireAuth.signOut()
//         localStorage.removeItem("user")
//     }
// }

import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import { Doctor } from "../models/patient.model"

@Injectable({ providedIn: "root" })
export class AuthService {
    private loggedInSubject = new BehaviorSubject<boolean>(false)
    private currentDoctorSubject = new BehaviorSubject<Doctor | null>(null)

    constructor() {
        // Check if user is already logged in
        const doctor = localStorage.getItem("currentDoctor")
        if (doctor) {
            this.currentDoctorSubject.next(JSON.parse(doctor))
            this.loggedInSubject.next(true)
        }
    }

    get isLoggedIn(): Observable<boolean> {
        return this.loggedInSubject.asObservable()
    }

    get currentDoctor(): Observable<Doctor | null> {
        return this.currentDoctorSubject.asObservable()
    }

    login(username: string, password: string, specialty: string): boolean {
        // Simple validation - in real app, this would call an API
        if (username && password && specialty) {
            const doctor: Doctor = { username, specialty }
            localStorage.setItem("currentDoctor", JSON.stringify(doctor))
            this.currentDoctorSubject.next(doctor)
            this.loggedInSubject.next(true)
            return true
        }
        return false
    }

    logout(): void {
        localStorage.removeItem("currentDoctor")
        this.currentDoctorSubject.next(null)
        this.loggedInSubject.next(false)
    }
}
