import { Rule } from 'eslint'
import { getProp, getPropValue, hasProp } from 'jsx-ast-utils'
import { TEST_ID, ACCESSIBILITY_LABEL } from '../../constants'
import { createSchema } from '../../utils'

const ERROR_MESSAGE =
  'Do not use `AccessibilityLabel` for only testing. This Prop conflicts with iOS. Did you set `testId` and `accessibilityLabel` to the same value?'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow set same label on `AccessibilityLabel` and `testID` both.',
    },
    schema: createSchema(),
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      if (
        hasProp(node.attributes, TEST_ID) &&
        hasProp(node.attributes, ACCESSIBILITY_LABEL)
      ) {
        const accessibilityLabel = getPropValue(
          getProp(node.attributes, ACCESSIBILITY_LABEL),
        )
        const testId = getPropValue(getProp(node.attributes, TEST_ID))
        if (accessibilityLabel === testId)
          context.report({
            node,
            message: ERROR_MESSAGE,
          })
      }
    },
  }),
}
