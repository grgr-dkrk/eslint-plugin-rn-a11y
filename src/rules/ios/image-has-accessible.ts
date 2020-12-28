import { isTargetElement } from '../../utils'
import { Rule } from 'eslint'
import { hasEveryProp } from 'jsx-ast-utils'
import { IMAGE, ACCESSIBLE, ACCESSIBILITY_LABEL } from '../../constants'
import { JSXOpeningElement } from '../../types'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce `Image` must have `accessible` and `accessibilityLabel`.',
    },
    schema: [],
  },
  create: (context) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (
        isTargetElement(node, context.options, [IMAGE]) &&
        !hasEveryProp(node.attributes, [ACCESSIBLE, ACCESSIBILITY_LABEL])
      ) {
        context.report({
          node,
          message: `Image should has \`accessible\` and \`accessibilityLabel\``,
        })
      }
    },
  }),
}
