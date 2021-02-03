import { RuleTester } from 'eslint'
import { touchableHasAlt } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester(createTesterOptions())

const ERROR_MESSAGE =
  'The `Touchable` Element must have accessible text. Need to use `accessible` prop and `accessiblityLabel` for the `Touchable` Element to make it accessible.'

// @ts-ignore
ruleTester.run('touchable-has-alt', touchableHasAlt, {
  valid: [
    {
      code: `<TouchableOpacity><Image source={require('@expo/snack-static/react-native-logo.png')} accessible accessibilityLabel="Click Me" /></TouchableOpacity>`,
    },
    {
      code: `<TouchableOpacity accessible accessibilityLabel="Click Me"><Image source={require('@expo/snack-static/react-native-logo.png')} /></TouchableOpacity>`,
    },
    {
      code: `<TouchableOpacity><View><View><View><View><Text>OK</Text></View></View></View></View></TouchableOpacity>`,
    },
    // TODO: correctly but not good, fix
    {
      code: `<TouchableOpacity><Text></Text></TouchableOpacity>`,
    },
  ],
  invalid: [
    {
      code: `<TouchableOpacity><Image source={require('@expo/snack-static/react-native-logo.png')} /></TouchableOpacity>`,
      errors: [
        {
          message: ERROR_MESSAGE,
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `<MyButton><Image source={require('@expo/snack-static/react-native-logo.png')} /></MyButton>`,
      errors: [
        {
          message: ERROR_MESSAGE,
          type: 'JSXOpeningElement',
        },
      ],
      options: [
        {
          Touchable: ['MyButton'],
        },
      ],
    },
  ],
})
