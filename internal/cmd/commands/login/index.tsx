import React from 'react'
import type { CAC } from 'cac'
import { LoginScreen } from '@internal/ui'

import { renderScreen } from '../../utils'

export function registerLoginCommand(cli: CAC) {
  cli
    .command(
      'login',
      'Login with your email and password (other providers available soon)'
    )
    .alias('l')
    .action(() => renderScreen(<LoginScreen />))
}
