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

export function assertValidEmailCredentials(credentials: EmailCredentials) {
  if (!credentials.email || credentials.password) {
    throw new Error('Both `email` and `password` are required')
  }
}

export function assertValidUserCredentials(credentials: UserCredentials) {
  assertValidEmailCredentials(credentials)

  if (!credentials.givenName || !credentials.familyName) {
    throw new Error('Both your `given name` and `family name` are required')
  }
}

export async function loginWithEmailCredentials(credentials: EmailCredentials) {
  assertValidEmailCredentials(credentials)

  return signInWithEmailAndPassword(
    getAuth(),
    credentials.email,
    credentials.password
  )
}

export async function registerWithEmailCredentials(
  credentials: UserCredentials
) {
  assertValidUserCredentials(credentials)

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
