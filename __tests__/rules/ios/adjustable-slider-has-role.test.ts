import { RuleTester } from '../../../src/types/modules/eslint'
import { adjustableSliderHasRole } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester(createTesterOptions())

ruleTester.run('adjustable-slider-has-role', adjustableSliderHasRole, {
  valid: [
    {
      code: `<Slider />`,
    },
    {
      code: `<Slider accessible accessibilityActions={[{ name: 'activate', label: 'activate' }]} />`,
    },
    {
      code: `<Slider accessible accessibilityRole="adjustable" accessibilityActions={[{ name: 'increment', label: 'increment' }]} />`,
    },
    {
      code: `<Slider accessible accessibilityRole="adjustable" accessibilityActions={[{ name: 'decrement', label: 'decrement' }]} />`,
    },
    {
      code: `<Slider accessible accessibilityRole="adjustable" accessibilityActions={[{ name: 'increment', label: 'increment' }, { name: 'decrement', label: 'decrement' }]} />`,
    },
  ],
  invalid: [
    {
      code: `<Slider accessible accessibilityActions={[{ name: 'increment', label: 'increment' }]} />`,
      errors: [
        {
          message:
            '`accessibilityRole="adjustable"` role is required for iOS to recognize components that can be incremented or decremented.',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `<Slider accessible accessibilityActions={[{ name: 'decrement', label: 'decrement' }]} />`,
      errors: [
        {
          message:
            '`accessibilityRole="adjustable"` role is required for iOS to recognize components that can be incremented or decremented.',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `<Slider accessible accessibilityActions={[{ name: 'increment', label: 'increment' }, { name: 'decrement', label: 'decrement' }]} />`,
      errors: [
        {
          message:
            '`accessibilityRole="adjustable"` role is required for iOS to recognize components that can be incremented or decremented.',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `<Slider accessible accessibilityActions={[{ name: 'increment', label: 'increment' }, { name: 'decrement', label: 'decrement' }]} />`,
      errors: [
        {
          message:
            '`accessibilityRole="adjustable"` role is required for iOS to recognize components that can be incremented or decremented.',
          type: 'JSXOpeningElement',
        },
      ],
    },
  ],
})
