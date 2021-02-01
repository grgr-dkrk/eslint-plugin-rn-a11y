import { Rule } from 'eslint'
import { hasProp } from 'jsx-ast-utils'
import { TEST_ID, ACCESSIBILITY_LABEL, ACCESSIBLE } from '../../constants'
import { createSchema } from '../../utils'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow set `AccessibilityLabel` and `testID` both without `Accessible`.',
    },
    schema: createSchema(),
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      if (
        hasProp(node.attributes, TEST_ID) &&
        hasProp(node.attributes, ACCESSIBILITY_LABEL) &&
        !hasProp(node.attributes, ACCESSIBLE)
      ) {
        context.report({
          node,
          message:
            'Do not use `AccessibilityLabel` for only testing. This Prop conflicts with iOS.',
        })
      }
    },
  }),
}
