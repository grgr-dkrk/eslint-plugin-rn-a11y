import { RuleTester } from 'eslint'
import { noDeprecatedProps } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

const ruleTester = new RuleTester(createTesterOptions())

const ERROR_ACCESSIBILITY_TRAITS =
  '`accessibilityTraits` is deprecated. Use `accessibilityState` instead.'

const ERROR_ACCESSIBILITY_COMPONENT_TYPE =
  '`accessibilityComponentType` is deprecated. Use `accessibilityRole` instead.'

// @ts-ignore
ruleTester.run('no-deprecated-props', noDeprecatedProps, {
  valid: [
    {
      code: `<TouchableOpacity />`,
    },
    {
      code: `<TouchableOpacity accessibilityRole />`,
    },
    {
      code: `<TouchableOpacity accessibilityRole="button" />`,
    },
    {
      code: `<TouchableOpacity accessibilityState />`,
    },
    {
      code: `<TouchableOpacity accessibilityState="button" />`,
    },
  ],
  invalid: [
    {
      code: `<TouchableOpacity accessibilityComponentType />`,
      errors: [ERROR_ACCESSIBILITY_COMPONENT_TYPE],
    },
    {
      code: `<TouchableOpacity accessibilityComponentType="button" />`,
      errors: [ERROR_ACCESSIBILITY_COMPONENT_TYPE],
    },
    {
      code: `<TouchableOpacity accessibilityTraits />`,
      errors: [ERROR_ACCESSIBILITY_TRAITS],
    },
    {
      code: `<TouchableOpacity accessibilityTraits="button" />`,
      errors: [ERROR_ACCESSIBILITY_TRAITS],
    },
    {
      code: `<TouchableOpacity accessibilityComponentType accessibilityTraits />`,
      errors: [ERROR_ACCESSIBILITY_COMPONENT_TYPE, ERROR_ACCESSIBILITY_TRAITS],
    },
    {
      code: `<TouchableOpacity accessibilityComponentType="button" accessibilityTraits="button" />`,
      errors: [ERROR_ACCESSIBILITY_COMPONENT_TYPE, ERROR_ACCESSIBILITY_TRAITS],
    },
  ],
})
