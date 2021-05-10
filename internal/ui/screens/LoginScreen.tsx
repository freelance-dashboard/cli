import React, { useState } from 'react'
import { Box, Text, useApp } from 'ink'
import Spinner from 'ink-spinner'
import { EmailCredentials, loginWithEmailCredentials } from '@internal/firebase'

import { LabeledInput } from '../components/LabeledInput'

const getEmptyCredentials = (): EmailCredentials => ({
  email: '',
  password: ''
})

// TODO: Simple regex for now (maybe wrong)
const EMAIL_REGEX = /^[^@]+@[^@]+/

export const LoginScreen: React.FC = () => {
  const app = useApp()

  const [credentials, setCredentials] = useState(getEmptyCredentials)
  const [showPassword, setShowPassword] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)
  const [logged, setLogged] = useState(false)

  const updateCredentials = (nextCredentials: Partial<EmailCredentials>) => {
    setCredentials({
      ...credentials,
      ...nextCredentials
    })
  }

  const onEmailSubmit = () => {
    if (!credentials.email || !EMAIL_REGEX.test(credentials.email)) {
      return
    }

    setShowPassword(true)
  }

  const doLogin = async () => {
    setLoggingIn(true)

    try {
      await loginWithEmailCredentials(credentials)

      setLogged(true)

      // Wait for `Logged successfully` message to render
      setTimeout(() => {
        app.exit()
      }, 50)
    } catch (error) {
      setShowPassword(false)
      setCredentials(getEmptyCredentials)
    }

    setLoggingIn(false)
  }

  if (loggingIn) {
    return (
      <Text>
        <Text color="green">
          <Spinner type="dots" />
        </Text>{' '}
        Logging in...
      </Text>
    )
  }

  if (logged) {
    return <Text color="green">✔️ Logged sucessfully</Text>
  }

  return (
    <Box flexDirection="column">
      <LabeledInput
        label={
          <>
            Enter your <Text color="yellow">email</Text>:
          </>
        }
        value={credentials.email}
        onChange={email => updateCredentials({ email })}
        onSubmit={onEmailSubmit}
      />

      {showPassword && (
        <LabeledInput
          label={
            <>
              Enter your <Text color="yellow">password</Text>:
            </>
          }
          mask="*"
          value={credentials.password}
          onChange={password => updateCredentials({ password })}
          onSubmit={doLogin}
        />
      )}
    </Box>
  )
}
