import { RuleTester } from 'eslint'
import { touchableHasAlt } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester(createTesterOptions())

const ERROR_LABEL =
  'The `Touchable` Element must have accessible text. Need to use `accessible` prop and `accessibilityLabel` for the `Touchable` Element to make it accessible.'

const ERROR_IMAGE_BUTTON_ROLE =
  'Does the button contain only `<Image />`? We recommend that add `accessibilityRole = "imagebutton"` to Touchables.'

const ERROR_BUTTON_ROLE =
  'We recommend that add `accessibilityRole = "button"` to Touchables.'

const options = {
  checkRole: true,
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
    // button role
    {
      code: `<TouchableOpacity accessible accessibilityLabel="Click Me" accessibilityRole="button"><Text>Click</Text></TouchableOpacity>`,
      options: [options],
    },
    // imagebutton role
    {
      code: `<TouchableOpacity accessible accessibilityRole="imagebutton" accessibilityLabel="Click Me"><Image source={require('@expo/snack-static/react-native-logo.png')} /></TouchableOpacity>`,
      options: [options],
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
    // button role
    {
      code: `<TouchableOpacity accessible accessibilityLabel="Click Me"><Text>Click</Text></TouchableOpacity>`,
      errors: [
        {
          message: ERROR_BUTTON_ROLE,
          type: 'JSXOpeningElement',
        },
      ],
      options: [options],
    },
    {
      code: `<TouchableOpacity accessible accessibilityLabel="Click Me" accessibilityRole="imagebutton"><Text>Click</Text></TouchableOpacity>`,
      errors: [
        {
          message: ERROR_BUTTON_ROLE,
          type: 'JSXOpeningElement',
        },
      ],
      options: [options],
    },
    // imagebutton role
    {
      code: `<TouchableOpacity accessible accessibilityLabel="Click Me"><Image source={require('@expo/snack-static/react-native-logo.png')} /></TouchableOpacity>`,
      errors: [
        {
          message: ERROR_IMAGE_BUTTON_ROLE,
          type: 'JSXOpeningElement',
        },
      ],
      options: [options],
    },
    {
      code: `<TouchableOpacity accessible accessibilityLabel="Click Me" accessibilityRole="button"><Image source={require('@expo/snack-static/react-native-logo.png')} /></TouchableOpacity>`,
      errors: [
        {
          message: ERROR_IMAGE_BUTTON_ROLE,
          type: 'JSXOpeningElement',
        },
      ],
      options: [options],
    },
    {
      code: `<MyButton accessible accessibilityLabel="Click Me"><Image source={require('@expo/snack-static/react-native-logo.png')} /></MyButton>`,
      errors: [
        {
          message: ERROR_IMAGE_BUTTON_ROLE,
          type: 'JSXOpeningElement',
        },
      ],
      options: [
        {
          ...options,
          Touchable: ['MyButton'],
        },
      ],
    },
    {
      code: `<MyButton accessible accessibilityLabel="Click Me"><MyPict source={require('@expo/snack-static/react-native-logo.png')} /></MyButton>`,
      errors: [
        {
          message: ERROR_IMAGE_BUTTON_ROLE,
          type: 'JSXOpeningElement',
        },
      ],
      options: [
        {
          ...options,
          Touchable: ['MyButton'],
          Image: ['MyPict'],
        },
      ],
    },
  ],
})
