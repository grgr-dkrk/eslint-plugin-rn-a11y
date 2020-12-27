import { RuleTester } from 'eslint'
import { accessibleImageHasLabel } from '../../..'
import { createTesterOptions } from '../../createTesterOptions'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester(createTesterOptions())

ruleTester.run('accessible-image-has-label', accessibleImageHasLabel, {
  valid: [
    {
      code: `<View><Image source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
    },
    {
      code: `<View><Image accessible accessibilityLabel="image" source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
    },
    {
      code: `<View><Image accessibilityLabel="image" source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
    },
  ],
  invalid: [
    {
      code: `<View><Image accessible source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
      errors: [
        {
          message:
            'If an Image has `accessible` props, the Image should has `accessibilityLabel` props.',
          type: 'JSXOpeningElement',
        },
      ],
    },
  ],
})
