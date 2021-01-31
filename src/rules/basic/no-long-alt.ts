import { Rule } from 'eslint'
import { getProp, getPropValue } from 'jsx-ast-utils'
import { ACCESSIBILITY_LABEL } from '../../constants'
import { JSXOpeningElement } from '../../types'
import { createSchema } from '../../utils'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforces limit number of alt text.',
    },
    schema: createSchema(),
  },

  create: (context) => {
    const limit = context.options[0]?.limit ?? 125
    return {
      JSXOpeningElement: (node: JSXOpeningElement) => {
        const labelProp = getProp(node.attributes, ACCESSIBILITY_LABEL)
        const accessibilityLabel = getPropValue<string>(labelProp)
        if (accessibilityLabel && [...accessibilityLabel].length > limit) {
          context.report({
            node,
            message: `Alternate messages should be no more than ${limit} characters.`,
          })
        }
      },
    }
  },
}
