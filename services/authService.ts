import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth'

export default class AuthService {
  constructor(
    private auth = getAuth(),
  ) { }

  async signUp(email: string, password: string): Promise<User | null> {
    try {
      const signupResponsive = await createUserWithEmailAndPassword(this.auth, email, password)

      return signupResponsive.user
    }
    catch {
      return null
    }
  }

  async signIn(email: string, password: string): Promise<User | null> {
    try {
      const signingResponsive = await signInWithEmailAndPassword(this.auth, email, password)

      return signingResponsive.user
    }
    catch {
      return null
    }
  }

  async signOut(): Promise<void> {
    await signOut(this.auth)
  }
}
