import type { CAC } from 'cac'

type HelpSections = Parameters<Parameters<CAC['help']>[0]>[0]

function addExtraPaddingPerLine(text: string) {
  return text.replace(/\n+/g, '$&  ')
}

export function addExtraLeftPadding(sections: HelpSections) {
  return sections.map(section => {
    const copySection = { ...section }

    if (copySection.title) {
      copySection.title = `  ${addExtraPaddingPerLine(copySection.title)}`
    }

    copySection.body = `  ${addExtraPaddingPerLine(copySection.body)}`
    return copySection
  })
}
