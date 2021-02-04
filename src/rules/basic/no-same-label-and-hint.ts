import { Rule } from 'eslint'
import { getProp, getPropValue } from 'jsx-ast-utils'
import { ACCESSIBILITY_HINT, ACCESSIBILITY_LABEL } from '../../constants'
import { createSchema } from '../../utils'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Prohibit the same sentence for `accessibilityLabel` and `accessibilityHint`',
    },
    schema: createSchema(),
  },

  create: (context) => {
    return {
      JSXOpeningElement: (node) => {
        const accessibilityLabel = getPropValue<string>(
          getProp(node.attributes, ACCESSIBILITY_LABEL),
        )
        const accessibilityHint = getPropValue<string>(
          getProp(node.attributes, ACCESSIBILITY_HINT),
        )
        if (
          accessibilityLabel &&
          accessibilityHint &&
          accessibilityHint.toLowerCase() === accessibilityLabel.toLowerCase()
        )
          context.report({
            node,
            message:
              'Do not make `accessibilityHint` and` accessibilityLabel` the same. The same text may be read twice.',
          })
      },
    }
  },
}
