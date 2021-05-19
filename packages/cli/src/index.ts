import React from 'react'

global.React = React

import { setupCLI } from './setup'

const cli = setupCLI()

cli.parse()
