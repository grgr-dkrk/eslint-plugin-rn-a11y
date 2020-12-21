import { Rule } from 'eslint'
import { elementType, hasProp } from 'jsx-ast-utils'
import { ACCESSIBLE, ACCESSIBILITY_LABEL } from '../../constants'
import { IMAGE } from '../../constants'
import { JSXOpeningElement } from '../../types'

export const rule: Rule.RuleModule = {
  create: (context) => ({
    // @ts-ignore
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (
        elementType(node) === IMAGE &&
        hasProp(node.attributes, ACCESSIBLE) &&
        !hasProp(node.attributes, ACCESSIBILITY_LABEL)
      ) {
        context.report({
          // @ts-ignore
          node,
          message:
            'If an Image has `accessible` props, the Image should has `accessibilityLabel` props.',
        })
      }
    },
  }),
}
