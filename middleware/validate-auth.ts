import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  const { isLoggedIn, user } = storeToRefs(authStore)
  const firebaseAuth = getAuth()

  await new Promise<void>((resolve) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      user.value = firebaseUser
      isLoggedIn.value = !!firebaseUser
      unsubscribe()
      resolve()
    })
  })

  if (!isLoggedIn.value) {
    return navigateTo('/sign')
  }
})
