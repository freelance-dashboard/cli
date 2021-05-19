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

enum LoginState {
  NOT_LOGGED,
  LOGGING_IN,
  LOGIN_ERROR,
  LOGIN_SUCCESSFUL
}

const renderLoggingIn = () => (
  <Text>
    <Text color="green">
      <Spinner type="dots" />
    </Text>{' '}
    Logging in...
  </Text>
)

const renderLoggingError = () => (
  <Text color="green">
    ❌{'  '}An error ocurred while logging in. (See `fd-debug.log`)
  </Text>
)

const renderLoggingSuccessful = () => (
  <Text color="green">✔️{'  '}Logged sucessfully</Text>
)

export const LoginScreen: React.FC = () => {
  const app = useApp()

  const [credentials, setCredentials] = useState(getEmptyCredentials)
  const [showPassword, setShowPassword] = useState(false)
  const [currentLoginState, setCurrentLoginState] = useState(
    LoginState.NOT_LOGGED
  )

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
    setCurrentLoginState(LoginState.LOGGING_IN)

    try {
      await loginWithEmailCredentials(credentials)

      setCurrentLoginState(LoginState.LOGIN_SUCCESSFUL)

      // Wait for `Logged successfully` message to render
      setTimeout(() => {
        app.exit()
      }, 50)
    } catch (error) {
      setCurrentLoginState(LoginState.LOGIN_ERROR)

      setShowPassword(false)
      setCredentials(getEmptyCredentials)
    }
  }

  const renderForm = () => (
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
        focus={!showPassword}
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
          focus={showPassword}
        />
      )}
    </Box>
  )

  const renderFunctions: Record<LoginState, () => React.ReactElement> = {
    [LoginState.LOGGING_IN]: renderLoggingIn,
    [LoginState.LOGIN_ERROR]: renderLoggingError,
    [LoginState.LOGIN_SUCCESSFUL]: renderLoggingSuccessful,
    [LoginState.NOT_LOGGED]: renderForm
  }

  return renderFunctions[currentLoginState]()
}
