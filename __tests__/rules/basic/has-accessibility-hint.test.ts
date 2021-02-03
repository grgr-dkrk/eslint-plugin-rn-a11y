import { RuleTester } from 'eslint'
import { hasAccessibilityHint } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

const ruleTester = new RuleTester(createTesterOptions())

const ERROR_MESSAGE = 'has accessibilityLabel prop but no accessibilityHint'

// @ts-ignore
ruleTester.run('has-accessibility-hint', hasAccessibilityHint, {
  valid: [
    {
      code: `<TouchableOpacity />`,
    },
    {
      code: `<TouchableOpacity accessibilityHint="Navigates to the previous screen" />`,
    },
    {
      code: `<TouchableOpacity accessibilityLabel="Go back" accessibilityHint="Navigates to the previous screen" />`,
    },
  ],
  invalid: [
    {
      code: `<TouchableOpacity accessibilityLabel="Go back" />`,
      errors: [ERROR_MESSAGE],
    },
  ],
})
