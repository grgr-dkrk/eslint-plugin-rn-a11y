import { RuleTester } from '../../../src/types/modules/eslint'
import { imageHasAccessible } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester(createTesterOptions())

ruleTester.run('image-has-accessible', imageHasAccessible, {
  valid: [
    {
      code: `<View><Image accessible accessibilityLabel="image" source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
    },
  ],
  invalid: [
    {
      code: `<View><Image source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
      errors: [
        {
          message: 'Image should has `accessible` and `accessibilityLabel`',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `<View><Image accessible source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
      errors: [
        {
          message: 'Image should has `accessible` and `accessibilityLabel`',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `<View><Image accessibilityLabel="image" source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
      errors: [
        {
          message: 'Image should has `accessible` and `accessibilityLabel`',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `<View><MyImage accessibilityLabel="image" source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
      errors: [
        {
          message: 'Image should has `accessible` and `accessibilityLabel`',
          type: 'JSXOpeningElement',
        },
      ],
      options: [
        {
          Image: ['MyImage'],
        },
      ],
    },
  ],
})
