import { RuleTester } from 'eslint'
import { touchableHasAlt } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester(createTesterOptions())

const ERROR_LABEL =
  'The `Touchable` Element must have accessible text. Need to use `accessible` prop and `accessiblityLabel` for the `Touchable` Element to make it accessible.'

const ERROR_ROLE =
  'Does the button contain only `<Image />`? We recommend that you add `accessibilityRole = "imagebutton"` to Touchables.'

const experimentalOptions = {
  __experimentalCheckRole: true,
}

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
    // imagebutton role
    {
      code: `<TouchableOpacity accessible accessibilityRole="imagebutton" accessibilityLabel="Click Me"><Image source={require('@expo/snack-static/react-native-logo.png')} /></TouchableOpacity>`,
      options: [experimentalOptions],
    },
  ],
  invalid: [
    {
      code: `<TouchableOpacity><Image source={require('@expo/snack-static/react-native-logo.png')} /></TouchableOpacity>`,
      errors: [
        {
          message: ERROR_LABEL,
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `<MyButton><Image source={require('@expo/snack-static/react-native-logo.png')} /></MyButton>`,
      errors: [
        {
          message: ERROR_LABEL,
          type: 'JSXOpeningElement',
        },
      ],
      options: [
        {
          Touchable: ['MyButton'],
        },
      ],
    },
    // imagebutton role
    {
      code: `<TouchableOpacity accessible accessibilityLabel="Click Me"><Image source={require('@expo/snack-static/react-native-logo.png')} /></TouchableOpacity>`,
      errors: [
        {
          message: ERROR_ROLE,
          type: 'JSXOpeningElement',
        },
      ],
      options: [experimentalOptions],
    },
    {
      code: `<MyButton accessible accessibilityLabel="Click Me"><Image source={require('@expo/snack-static/react-native-logo.png')} /></MyButton>`,
      errors: [
        {
          message: ERROR_ROLE,
          type: 'JSXOpeningElement',
        },
      ],
      options: [
        {
          ...experimentalOptions,
          Touchable: ['MyButton'],
        },
      ],
    },
    {
      code: `<MyButton accessible accessibilityLabel="Click Me"><MyPict source={require('@expo/snack-static/react-native-logo.png')} /></MyButton>`,
      errors: [
        {
          message: ERROR_ROLE,
          type: 'JSXOpeningElement',
        },
      ],
      options: [
        {
          ...experimentalOptions,
          Touchable: ['MyButton'],
          Image: ['MyPict'],
        },
      ],
    },
  ],
})
