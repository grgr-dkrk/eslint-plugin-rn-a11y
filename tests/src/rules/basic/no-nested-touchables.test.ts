import { RuleTester } from 'eslint'
import { noNestedTouchables } from '../../../../src/rules/basic'
import { createTesterOptions } from '../../../__utiles__'

const ruleTester = new RuleTester(createTesterOptions())

const ERROR_MESSAGE =
  'Elements with `accessible={true}` must not have any clickable elements inside'

ruleTester.run('no-nested-touchables', noNestedTouchables, {
  valid: [
    {
      code: `<Button title="button" onPress={() => {}} />`,
    },
    {
      code: `<TouchableOpacity onPress={() => {}}><Text>Button</Text></TouchableOpacity>`,
    },
    {
      code: `<TouchableOpacity accessible onPress={() => {}}><Text>Button</Text></TouchableOpacity>`,
    },
    {
      code: `<TouchableOpacity accessible onPress={() => {}}><Text><Text>Button</Text></Text></TouchableOpacity>`,
    },
  ],
  invalid: [
    {
      code: `<TouchableOpacity accessible onPress={() => {}}><Button title="button" onPress={() => {}} /></TouchableOpacity>`,
      errors: [ERROR_MESSAGE],
    },
    {
      code: `<TouchableOpacity accessible onPress={() => {}}><Text><Button title="button" onPress={() => {}} /></Text></TouchableOpacity>`,
      errors: [ERROR_MESSAGE],
    },
    {
      code: `<TouchableOpacity accessible onPress={() => {}}><TouchableOpacity><Text>Nested</Text></TouchableOpacity></TouchableOpacity>`,
      errors: [ERROR_MESSAGE],
    },
    {
      code: `<TouchableOpacity accessible onPress={() => {}}><View><TouchableOpacity><Text>Nested</Text></TouchableOpacity></View></TouchableOpacity>`,
      errors: [ERROR_MESSAGE],
    },
  ],
})
