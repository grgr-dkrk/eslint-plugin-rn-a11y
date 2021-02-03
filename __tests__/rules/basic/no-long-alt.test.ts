import { RuleTester } from '../../../src/types/modules/eslint'
import { noLongAlt } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

const ruleTester = new RuleTester(createTesterOptions())

ruleTester.run('no-long-alt', noLongAlt, {
  valid: [
    {
      code: `<Image accessible source={require('test.jpg')} />`,
    },
    {
      code: `<Image accessible accessibilityLabel="${'a'.repeat(
        40,
      )}" source={require('test.jpg')} />`,
    },
    {
      code: `<Image accessible accessibilityLabel="${'a'.repeat(
        125,
      )}" source={require('test.jpg')} />`,
    },
    {
      code: `<Image accessible accessibilityLabel="${'a'.repeat(
        130,
      )}" source={require('test.jpg')} />`,
      options: [
        {
          limit: 130,
        },
      ],
    },
  ],
  invalid: [
    {
      code: `<Image accessible accessibilityLabel="${'a'.repeat(
        126,
      )}" source={require('test.jpg')} />`,
      errors: ['Alternate messages should be no more than 125 characters.'],
    },
    {
      code: `<Image accessible accessibilityLabel="${'a'.repeat(
        31,
      )}" source={require('test.jpg')} />`,
      errors: ['Alternate messages should be no more than 30 characters.'],
      options: [
        {
          limit: 30,
        },
      ],
    },
    {
      code: `<MyA11yImage accessible accessibilityLabel="${'a'.repeat(
        31,
      )}" source={require('test.jpg')} />`,
      errors: ['Alternate messages should be no more than 30 characters.'],
      options: [
        {
          Image: ['MyA11yImage'],
          limit: 30,
        },
      ],
    },
  ],
})
