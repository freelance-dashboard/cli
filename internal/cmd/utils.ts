import { render } from 'ink'

export async function renderScreen(...args: Parameters<typeof render>) {
  const screenApp = render(...args)

  await screenApp.waitUntilExit()
}
