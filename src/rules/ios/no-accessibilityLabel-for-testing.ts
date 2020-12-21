import { Rule } from 'eslint'
import { hasProp } from 'jsx-ast-utils'
import { ACCESSIBILITY_LABEL, ACCESSIBLE, TEST_ID } from '../../constants'
import { JSXOpeningElement } from '../../types'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow set `AccessibilityLabel` and `testID` both without `Accessible`.',
    },
    schema: [],
  },

  create: (context) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
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
