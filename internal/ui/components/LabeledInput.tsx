import React from 'react'
import { Box, Text } from 'ink'
import TextInput from 'ink-text-input'

type TextInputProps = typeof TextInput extends React.FC<infer Props>
  ? Props
  : never

export type LabeledInputProps = TextInputProps & {
  label: React.ReactNode
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  ...textInputProps
}) => {
  return (
    <Box>
      <Box marginRight={1}>
        <Text>{label}</Text>
      </Box>

      <TextInput {...textInputProps} />
    </Box>
  )
}
