import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

export interface EmailCredentials {
  email: string
  password: string
}

export interface UserCredentials extends EmailCredentials {
  givenName: string
  familyName: string
}

export async function loginWithEmailCredentials(credentials: EmailCredentials) {
  return signInWithEmailAndPassword(
    getAuth(),
    credentials.email,
    credentials.password
  )
}

export async function registerWithEmailCredentials(
  credentials: UserCredentials
) {
  const userCredential = await createUserWithEmailAndPassword(
    getAuth(),
    credentials.email,
    credentials.password
  )

  const userDoc = doc(getFirestore(), `users/${userCredential.user.uid}`)

  try {
    await updateProfile(userCredential.user, {
      displayName: `${credentials.givenName} ${credentials.familyName}`
    })

    await setDoc(userDoc, {
      givenName: credentials.givenName,
      familyName: credentials.familyName
    })
  } catch (error) {
    // TODO: If any of the previous steps within the `try` block fails
    // we should revert the user's creation.
    throw error
  }

  return userCredential
}
