import { RuleTester } from 'eslint'
import { touchableTextHasRole } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

const ruleTester = new RuleTester(createTesterOptions())

const ERROR_MESSAGE = 'Touchable `Text` requires `accessibilityRole`.'

ruleTester.run('touchable-text-has-role', touchableTextHasRole, {
  valid: [
    {
      code: `<View><Text accessibilityRole="button" onPress={() => {}}>Press Me</Text></View>`,
    },
    {
      code: `<View><Text>Normal Text</Text></View>`,
    },
    // custom Components
    {
      code: `<View><Link accessibilityRole="link" onPress={() => {}}>Link</Link></View>`,
      options: [
        {
          Text: ['Link'],
        },
      ],
    },
  ],
  invalid: [
    {
      code: `<View><Text onPress={() => {}}>Press Me</Text></View>`,
      errors: [ERROR_MESSAGE],
    },
    // custom components
    {
      code: `<View><Link onPress={() => {}}>Link</Link></View>`,
      errors: [ERROR_MESSAGE],
      options: [
        {
          Text: ['Link'],
        },
      ],
    },
  ],
})
