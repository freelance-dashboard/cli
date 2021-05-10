import type { CAC } from 'cac'
import { render } from 'ink'
import { LoginScreen } from '@internal/ui'

export function registerLoginCommand(cli: CAC) {
  cli
    .command(
      'login',
      'Login with your email and password (other providers available soon)'
    )
    .action(() => {
      render(<LoginScreen />)
    })
}
