import { Rule } from 'eslint'
import { elementType, hasEveryProp } from 'jsx-ast-utils'
import {
  ACCESSIBILITY_LABEL,
  ACCESSIBLE,
  TEXT,
  TOUCHABLE_ELEMENTS,
} from '../../../constants'
import { JSXOpeningElement } from '../../../types'
import { findChild, isTargetElement } from '../../../utils'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce `Touchable` components must have `accessible` and `accessibilityLabel` prop any children or self',
    },
    schema: [],
  },

  create: (context) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      const { parent } = node
      if (isTargetElement(node, context.options, TOUCHABLE_ELEMENTS)) {
        if (!hasEveryProp(node.attributes, [ACCESSIBLE, ACCESSIBILITY_LABEL])) {
          const hasAltElement = findChild(parent, (child) => {
            return (
              hasEveryProp(child.attributes, [
                ACCESSIBLE,
                ACCESSIBILITY_LABEL,
              ]) || elementType(child) === TEXT
            )
          })

          if (!hasAltElement) {
            context.report({
              node,
              message:
                'The `Touchable` Element must have accessible text. Need to use `accessible` prop and `accessiblityLabel` for the `Touchable` Element to make it accessible.',
            })
          }
        }
      }
    },
  }),
}
