import React, { useState } from 'react'
import { Box, Text } from 'ink'
import { EmailCredentials } from '@internal/firebase'

import { LabeledInput } from '../components/LabeledInput'

export const LoginScreen: React.FC = () => {
  const [credentials, setCredentials] = useState<EmailCredentials>({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)

  const updateCredentials = (nextCredentials: Partial<EmailCredentials>) => {
    setCredentials({
      ...credentials,
      ...nextCredentials
    })
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
        onSubmit={() => {
          setShowPassword(true)
        }}
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
        />
      )}
    </Box>
  )
}
