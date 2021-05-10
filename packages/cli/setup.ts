import cac from 'cac'
import { registerLoginCommand } from '@internal/cmd'

import pkg from './package.json'

const CLI_NAME = 'Freelance Dashboard CLI'

export function setupCLI() {
  const cli = cac(`${CLI_NAME} (${pkg.name})`)

  registerLoginCommand(cli)

  cli.help()
  cli.version(pkg.version)

  return cli
}
