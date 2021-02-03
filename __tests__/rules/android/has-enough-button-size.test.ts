import { RuleTester } from 'eslint'
import { hasEnoughButtonSize } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

const ruleTester = new RuleTester(createTesterOptions())

const ERROR_MESSAGE_WIDTH =
  '`width` on Touchable is too small, 144px or higher is recommended.'
const ERROR_MESSAGE_HEIGHT =
  '`height` on Touchable is too small, 144px or higher is recommended.'

// @ts-ignore
ruleTester.run('has-enough-button-size', hasEnoughButtonSize, {
  valid: [
    {
      code: `<TouchableOpacity />`,
    },
    {
      code: `export const Component = () => <TouchableOpacity style={[styles.wrapper, isActive && styles.isActive ]} />; const styles = Stylesheet.create({ wrapper: { width: 144, height: 144, } })`,
    },
    {
      code: `export const Component = () => <TouchableOpacity style={[styles.wrapper, isActive && styles.isActive ]} />; const styles = Stylesheet.create({ wrapper: { width: '144px', height: '144px', } })`,
    },
    // TODO: it is correctly but not good, fix
    {
      code: `const styles = Stylesheet.create({ wrapper: { width: 144, height: 144, } }); export const Component = () => <TouchableOpacity style={[styles.wrapper, isActive && styles.isActive ]} />`,
    },
  ],
  invalid: [
    {
      code: `export const Component = () => <TouchableOpacity style={[styles.wrapper, isActive && styles.isActive ]} />; const styles = Stylesheet.create({ wrapper: { width: 143, height: 143, } })`,
      errors: [ERROR_MESSAGE_WIDTH, ERROR_MESSAGE_HEIGHT],
    },
    {
      code: `export const Component = () => <TouchableOpacity style={[styles.wrapper, isActive && styles.isActive ]} />; const styles = Stylesheet.create({ wrapper: { width: "143px", height: "143px", } })`,
      errors: [ERROR_MESSAGE_WIDTH, ERROR_MESSAGE_HEIGHT],
    },
    {
      code: `export const Component = () => <MyButton style={[styles.wrapper, isActive && styles.isActive ]} />; const styles = Stylesheet.create({ wrapper: { width: "143px", height: "143px", } })`,
      errors: [ERROR_MESSAGE_WIDTH, ERROR_MESSAGE_HEIGHT],
      options: [
        {
          Touchable: ['MyButton'],
        },
      ],
    },
  ],
})
