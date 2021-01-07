import { createSchema, isTargetElement } from '../../utils'
import { Rule } from 'eslint'
import { hasProp } from 'jsx-ast-utils'
import { IMAGE, ACCESSIBLE, ACCESSIBILITY_LABEL } from '../../constants'
import { JSXOpeningElement } from '../../types'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce `Image` must have `accessibilityLabel` prop if it has `accessible`. ',
    },
    schema: createSchema(),
  },
  create: (context) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (
        isTargetElement(node, context.options, [IMAGE], IMAGE) &&
        hasProp(node.attributes, ACCESSIBLE) &&
        !hasProp(node.attributes, ACCESSIBILITY_LABEL)
      ) {
        context.report({
          node,
          message:
            'If an Image has `accessible` props, the Image should has `accessibilityLabel` props.',
        })
      }
    },
  }),
}
