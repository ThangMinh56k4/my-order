import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import { useDefineFirebaseService } from '~~/services'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const firebaseConfig = {
    apiKey: runtimeConfig.public.firebaseApiKey,
    authDomain: runtimeConfig.public.firebaseAuthDomain,
    projectId: runtimeConfig.public.firebaseProjectId,
    storageBucket: runtimeConfig.public.firebaseStorageBucket,
    messagingSenderId: runtimeConfig.public.firebaseMessagingSenderId,
    appId: runtimeConfig.public.firebaseAppId,
    measurementId: runtimeConfig.public.firebaseMeasurementId,
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const firestore = getFirestore(app)

  return {
    provide: useDefineFirebaseService(firestore),
  }
})
