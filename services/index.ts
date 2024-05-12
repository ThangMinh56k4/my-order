import { type Firestore } from 'firebase/firestore'

import CrudService from './crudService'
import AuthService from './authService'
import type { MenuItem } from '@/types'

export function defineFirebaseService(firestore: Firestore) {
  return {
    auth: new AuthService(),
    menu: new CrudService<MenuItem>(firestore, 'menu_items'),
  }
}

export type FirebaseService = ReturnType<typeof defineFirebaseService>

export function useDefineFirebaseService(firestore: Firestore) {
  return {
    firebaseService: defineFirebaseService(firestore),
  }
}
