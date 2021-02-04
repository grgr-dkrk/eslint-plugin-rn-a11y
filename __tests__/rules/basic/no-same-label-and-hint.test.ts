import { RuleTester } from 'eslint'
import { noSameLabelAndHint } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

const ruleTester = new RuleTester(createTesterOptions())

const ERROR_MESSAGE =
  'Do not make `accessibilityHint` and` accessibilityLabel` the same. The same text may be read twice.'

ruleTester.run('no-same-label-and-hint', noSameLabelAndHint, {
  valid: [
    // directly
    {
      code: `<TouchableOpacity accessible accessibilityLabel={'This is Button'} accessibilityHint={'Nothing happens when you press it, but this is a button.'}>Tap Me</TouchableOpacity>`,
    },
    // constants
    {
      code: `export const Component = () => { const LABEL = 'This is Button'; const HINT = 'Nothing happens when you press it, but this is a button.'; return (<TouchableOpacity accessible accessibilityLabel={LABEL} accessibilityHint={HINT}>Tap Me</TouchableOpacity>)}`,
    },
  ],
  invalid: [
    {
      code: `<TouchableOpacity accessible accessibilityLabel={'This is Button'} accessibilityHint={'This is Button'}>Tap Me</TouchableOpacity>`,
      errors: [ERROR_MESSAGE],
    },
    // different cases but same labels
    {
      code: `<TouchableOpacity accessible accessibilityLabel={'Button'} accessibilityHint={'button'}>Tap Me</TouchableOpacity>`,
      errors: [ERROR_MESSAGE],
    },
    // same constants
    {
      code: `export const Component = () => { const LABEL = 'Button'; return (<TouchableOpacity accessible accessibilityLabel={LABEL} accessibilityHint={LABEL}>Tap Me</TouchableOpacity>)}`,
      errors: [ERROR_MESSAGE],
    },
  ],
})
