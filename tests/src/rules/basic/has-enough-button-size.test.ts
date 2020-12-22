import { RuleTester } from 'eslint'
import { hasEnoughButtonSize } from '../../../../src/rules/basic'
import { createTesterOptions } from '../../../__utiles__'

const ruleTester = new RuleTester(createTesterOptions())

const ERROR_MESSAGE_WIDTH = 'Touchable width is too small, need 48dp and above.'
const ERROR_MESSAGE_HEIGHT =
  'Touchable height is too small, need 48dp and above.'

ruleTester.run('has-enough-button-size', hasEnoughButtonSize, {
  valid: [
    {
      code: `<TouchableOpacity />`,
    },
    {
      code: `export const Component = () => <TouchableOpacity style={[styles.wrapper, isActive && styles.isActive ]} />; const styles = Stylesheet.create({ wrapper: { width: 144, height: 144, } })`,
    },
  ],
  invalid: [
    {
      code: `export const Component = () => <TouchableOpacity style={[styles.wrapper, isActive && styles.isActive ]} />; const styles = Stylesheet.create({ wrapper: { width: 40, height: 40, } })`,
      errors: [ERROR_MESSAGE_WIDTH, ERROR_MESSAGE_HEIGHT],
    },
  ],
})
