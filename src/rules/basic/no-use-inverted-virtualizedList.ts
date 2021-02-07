import { Rule } from 'eslint'
import { hasProp } from 'jsx-ast-utils'
import { FLAT_LIST, INVERTED, SECTION_LIST } from '../../constants'
import { createSchema, isTargetElement } from '../../utils'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow using `inverted` props on VirtualizedList',
    },
    schema: createSchema(),
  },

  create: (context) => {
    return {
      JSXOpeningElement: (node) => {
        if (
          (isTargetElement(node, context.options, [FLAT_LIST], FLAT_LIST) ||
            isTargetElement(
              node,
              context.options,
              [SECTION_LIST],
              SECTION_LIST,
            )) &&
          hasProp(node.attributes, INVERTED)
        ) {
          context.report({
            node,
            message:
              '`inverted` only changes the order of the visual elements. This may prevent screen readers from reading correctly.',
          })
        }
      },
    }
  },
}
