import cac from 'cac'
import { registerLoginCommand } from '@internal/cmd'

import pkg from '../package.json'
import { addExtraLeftPadding } from './utils'

const CLI_NAME = 'Freelance Dashboard CLI'

export function setupCLI() {
  const cli = cac(Object.keys(pkg.bin)[0])

  registerLoginCommand(cli)

  cli.version(`v${pkg.version}`)

  // Override first section
  cli.help(([_, ...sections]) =>
    addExtraLeftPadding([
      {
        body: `\n${CLI_NAME} - v${pkg.version}`
      },
      ...sections
    ])
  )

  return cli
}
