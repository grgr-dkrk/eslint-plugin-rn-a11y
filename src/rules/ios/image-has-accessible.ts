import { Rule } from 'eslint'
import { elementType, hasEveryProp } from 'jsx-ast-utils'
import { ACCESSIBLE, ACCESSIBILITY_LABEL } from '../../constants'
import { IMAGE } from '../../constants'
import { JSXOpeningElement } from '../../types'

export const rule: Rule.RuleModule = {
  create: (context) => ({
    // @ts-ignore
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (
        elementType(node) === IMAGE &&
        !hasEveryProp(node.attributes, [ACCESSIBLE, ACCESSIBILITY_LABEL])
      ) {
        context.report({
          // @ts-ignore
          node,
          message: `Image should has \`${ACCESSIBLE}\` and \`${ACCESSIBILITY_LABEL}\``,
        })
      }
    },
  }),
}
