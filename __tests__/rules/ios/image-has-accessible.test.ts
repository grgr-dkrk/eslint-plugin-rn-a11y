import { RuleTester } from 'eslint'
import { imageHasAccessible } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester(createTesterOptions())

ruleTester.run('image-has-accessible', imageHasAccessible, {
  valid: [
    {
      code: `<View><Image accessible accessibilityLabel="React Native Logo" source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
    },
    {
      code: `<View><Image accessibilityLabel="React Native Logo" source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
      options: [
        {
          isSupportedIos: false,
        },
      ],
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
      code: `<View><Image accessibilityLabel="React Native Logo" source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
      errors: [
        {
          message: 'Image should has `accessible` and `accessibilityLabel`',
          type: 'JSXOpeningElement',
        },
      ],
    },
    // with options
    {
      code: `<View><Image source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
      errors: [
        {
          message: 'Image should has `accessibilityLabel`',
          type: 'JSXOpeningElement',
        },
      ],
      options: [
        {
          isSupportedIos: false,
        },
      ],
    },
    {
      code: `<View><Image accessible source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
      errors: [
        {
          message: 'Image should has `accessibilityLabel`',
          type: 'JSXOpeningElement',
        },
      ],
      options: [
        {
          isSupportedIos: false,
        },
      ],
    },
    {
      code: `<View><Image accessibilityLabel="" source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
      errors: [
        {
          message: 'Image should has `accessibilityLabel`',
          type: 'JSXOpeningElement',
        },
      ],
      options: [
        {
          isSupportedIos: false,
        },
      ],
    },
    // with options and customComponents
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
    {
      code: `<View><MyImage accessibilityLabel="" source={require('@expo/snack-static/react-native-logo.png')} /></View>`,
      errors: [
        {
          message: 'Image should has `accessibilityLabel`',
          type: 'JSXOpeningElement',
        },
      ],
      options: [
        {
          Image: ['MyImage'],
          isSupportedIos: false,
        },
      ],
    },
  ],
})
