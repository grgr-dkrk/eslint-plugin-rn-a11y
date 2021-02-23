import { RuleTester } from 'eslint'
import { noAccessibilityLabelForTesting } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester(createTesterOptions())
const ERROR_MESSAGE =
  'Do not use `AccessibilityLabel` for only testing. This Prop conflicts with iOS. Did you set `testId` and `accessibilityLabel` to the same value?'

ruleTester.run(
  'no-accessibilityLabel-for-testing',
  noAccessibilityLabelForTesting,
  {
    valid: [
      {
        code: `<View testID="forTestingComponent"></View>`,
      },
      {
        code: `<View accessible accessibilityLabel="View Component" testID="forTestingComponent"></View>`,
      },
      // `accessible` does not exist, but it passes because` testId` and `accessibilityLabel` are different
      {
        code: `<View accessibilityLabel="View Component" testID="forTestingComponent"></View>`,
      },
    ],
    invalid: [
      {
        code: `<View accessible testID="forTestingComponent" accessibilityLabel="forTestingComponent"></View>`,
        errors: [
          {
            message: ERROR_MESSAGE,
            type: 'JSXOpeningElement',
          },
        ],
      },
      {
        code: `<View testID="forTestingComponent" accessibilityLabel="forTestingComponent"></View>`,
        errors: [
          {
            message: ERROR_MESSAGE,
            type: 'JSXOpeningElement',
          },
        ],
      },
    ],
  },
)
