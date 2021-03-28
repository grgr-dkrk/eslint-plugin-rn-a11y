import { Rule } from 'eslint'
import { hasProp } from 'jsx-ast-utils'
import {
  TEXT_INPUT,
  ACCESSIBILITY_HINT,
  PLACEHOLDER,
  ACCESSIBILITY_LABEL,
} from '../../constants'
import { createSchema, isTargetElement } from '../../utils'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        '`TextInput` warns that` accessibilityLabel` may not read `accessibilityHint`.',
    },
    schema: createSchema(),
  },

  create: (context) => {
    return {
      JSXOpeningElement: (node) => {
        /**
         * Set the rule assuming that `TextInput` contains some `value` or `defaultValue`.
         */
        if (isTargetElement(node, context.options, [TEXT_INPUT], 'TextInput')) {
          if (
            hasProp(node.attributes, PLACEHOLDER) ||
            hasProp(node.attributes, ACCESSIBILITY_LABEL) ||
            hasProp(node.attributes, ACCESSIBILITY_HINT)
          ) {
            context.report({
              node,
              message:
                'On Android, `TextInput` does not read `accessibilityLabel` or `accessibilityHint` if `value` prop has any text. If you know the problem, you can ignore this warning.',
            })
          }
        }
      },
    }
  },
}
