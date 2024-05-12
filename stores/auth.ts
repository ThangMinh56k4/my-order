import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const { $firebaseService } = useNuxtApp()

  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)
  const firebaseAuth = getAuth()

  const logout = async () => {
    await $firebaseService.auth.signOut()
    isLoggedIn.value = false
    user.value = null
  }

  onAuthStateChanged(firebaseAuth, (firebaseUser) => {
    if (firebaseUser) {
      isLoggedIn.value = true
      user.value = firebaseUser
    }
    else {
      logout()
    }
  })

  return { user, isLoggedIn }
})
