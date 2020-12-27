import {
  JSXOpeningElement,
  IMAGE,
  ACCESSIBLE,
  ACCESSIBILITY_LABEL,
} from '@eslint-plugin-rn-a11y/interfaces'
import { isTargetElement } from '../../utils'
import { Rule } from 'eslint'
import { hasProp } from 'jsx-ast-utils'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce `Image` must have `accessibilityLabel` prop if it has `accessible`. ',
    },
    schema: [],
  },
  create: (context) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (
        isTargetElement(node, context.options, [IMAGE]) &&
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
