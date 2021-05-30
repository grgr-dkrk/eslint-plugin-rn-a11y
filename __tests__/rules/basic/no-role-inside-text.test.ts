import { RuleTester } from 'eslint'
import { noRoleInsideText } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

const ruleTester = new RuleTester(createTesterOptions())

const ERROR_MESSAGE =
  'Text components are accessible by default. The role inside is invalidated.'

ruleTester.run('no-role-inside-text', noRoleInsideText, {
  valid: [
    {
      code: `<Text>Text Test</Text>`,
    },
    {
      code: `<Text>Text <Text>Test</Text></Text>`,
    },
    {
      code: `<Text accessible={false}>Test <Text accessibilityRole="link">Link is Here</Text></Text>`,
    },
  ],
  invalid: [
    {
      code: `<Text>Text <Text accessibilityRole="link">Link is Here</Text></Text>`,
      errors: [ERROR_MESSAGE],
    },
    {
      code: `<Text>Text <Text>Text</Text><Text accessibilityRole="link">Link is Here</Text></Text>`,
      errors: [ERROR_MESSAGE],
    },
    {
      code: `<Text>Text <Text>Text <Text accessibilityRole="link">Link is Here</Text></Text></Text>`,
      errors: [ERROR_MESSAGE],
    },
    // customComponent
    {
      code: `<MyText>Text <Text accessibilityRole="link">Link is Here</Text></MyText>`,
      errors: [ERROR_MESSAGE],
      options: [
        {
          Text: ['MyText'],
        },
      ],
    },
  ],
})
