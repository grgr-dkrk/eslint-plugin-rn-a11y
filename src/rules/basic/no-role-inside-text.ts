import { Rule } from 'eslint'
import { getProp, getPropValue, hasProp } from 'jsx-ast-utils'
import { ACCESSIBILITY_ROLE, ACCESSIBLE, TEXT } from '../../constants'
import { createSchema, findChild, isTargetElement } from '../../utils'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Suggest not to add accessible attributes inside the text component.',
    },
    schema: createSchema(),
  },

  create: (context) => {
    return {
      JSXOpeningElement: (node) => {
        if (isTargetElement(node, context.options, [TEXT], TEXT)) {
          if (getPropValue(getProp(node.attributes, ACCESSIBLE)) === false) {
            return
          }
          const hasAccessibilityRoleOnChild = findChild(
            node.parent,
            (child) => hasProp(child.attributes, ACCESSIBILITY_ROLE),
            false,
          )
          if (hasAccessibilityRoleOnChild) {
            context.report({
              node,
              message: `Text components are accessible by default. The role inside is invalidated.`,
            })
          }
        }
      },
    }
  },
}
