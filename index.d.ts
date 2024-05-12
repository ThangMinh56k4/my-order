import type { FirebaseService } from './services'
import type { AppLoading } from '@/types'

declare module '#app' {
  interface NuxtApp {
    $firebaseService: FirebaseService
    $loading: AppLoading
  }
}
