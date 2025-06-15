import { inject, Injectable } from "@angular/core"
import { UserCredential } from "@angular/fire/auth"
import { AngularFireAuth } from "@angular/fire/compat/auth"

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private fireAuth = inject(AngularFireAuth)

    getLoggedInUser(): UserCredential | null {
        const jsonUser = localStorage.getItem("user")
        return jsonUser ? JSON.parse(jsonUser) : null
    }

    async login(email: string, password: string) {
        try {
            const resp = await this.fireAuth.signInWithEmailAndPassword(
                email,
                password
            )
            localStorage.setItem("user", JSON.stringify(resp))
            return resp
        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    async signup(email: string, password: string) {
        try {
            const resp = await this.fireAuth.createUserWithEmailAndPassword(
                email,
                password
            )
            localStorage.setItem("user", JSON.stringify(resp))
            return resp
        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    async logout() {
        await this.fireAuth.signOut()
        localStorage.removeItem("user")
    }
}
