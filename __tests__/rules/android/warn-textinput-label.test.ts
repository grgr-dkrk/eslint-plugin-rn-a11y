import { RuleTester } from 'eslint'
import { warnTextInputLabel } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

const ruleTester = new RuleTester(createTesterOptions())

const ERROR_MESSAGE =
  'On Android, `TextInput` does not read `accessibilityLabel` or `accessibilityHint` if `value` prop has any text. If you know the problem, you can ignore this warning.'

ruleTester.run('warn-textinput-label', warnTextInputLabel, {
  valid: [
    {
      code: `<TextInput />`,
    },
    {
      code: `<TextInput value={props.value} />`,
    },
    {
      code: `<StyledTextInput value={props.value} />`,
      options: [
        {
          TextInput: ['StyledTextInput'],
        },
      ],
    },
  ],
  invalid: [
    {
      code: `<TextInput value={props.value} accessibilityLabel="My Text Input" />`,
      errors: [ERROR_MESSAGE],
    },
    {
      code: `<TextInput value={props.value} accessibilityHint="Please Input" />`,
      errors: [ERROR_MESSAGE],
    },
    {
      code: `<TextInput value={props.value} accessibilityLabel="My Text Input" accessibilityHint="Please Input" />`,
      errors: [ERROR_MESSAGE],
    },
    {
      code: `<StyledTextInput value={props.value} accessibilityLabel="My Text Input" />`,
      errors: [ERROR_MESSAGE],
      options: [
        {
          TextInput: ['StyledTextInput'],
        },
      ],
    },
  ],
})
