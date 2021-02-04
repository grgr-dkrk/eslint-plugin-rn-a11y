import { RuleTester } from 'eslint'
import { noAccessibilityLabelForTesting } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester(createTesterOptions())

ruleTester.run(
  'no-accessibilityLabel-for-testing',
  noAccessibilityLabelForTesting,
  {
    valid: [
      {
        code: `<View testID="forTestingComponent"></View>`,
      },
      // TODO: This test isn't entirely correct because we haven't actually compared the contents of the strings.
      {
        code: `<View accessible accessibilityLabel="View" testID="forTestingComponent"></View>`,
      },
    ],
    invalid: [
      {
        code: `<View testID="forTestingComponent" accessibilityLabel="forTestingComponent"></View>`,
        errors: [
          {
            message:
              'Do not use `AccessibilityLabel` for only testing. This Prop conflicts with iOS.',
            type: 'JSXOpeningElement',
          },
        ],
      },
    ],
  },
)
