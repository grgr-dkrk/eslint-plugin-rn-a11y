import { isTargetElement, findChild, createSchema } from '../../../utils'
import { Rule } from 'eslint'
import { hasEveryProp } from 'jsx-ast-utils'
import {
  TOUCHABLE_ELEMENTS,
  ACCESSIBLE,
  ACCESSIBILITY_LABEL,
  TEXT,
  CUSTOM_TOUCHABLE,
} from '../../../constants'
import { JSXOpeningElement } from '../../../types'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce `Touchable` components must have `accessible` and `accessibilityLabel` prop any children or self',
    },
    schema: createSchema(),
  },

  create: (context) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      const { parent } = node
      if (
        isTargetElement(
          node,
          context.options,
          TOUCHABLE_ELEMENTS,
          CUSTOM_TOUCHABLE,
        )
      ) {
        if (!hasEveryProp(node.attributes, [ACCESSIBLE, ACCESSIBILITY_LABEL])) {
          const hasAltElement = findChild(parent, (child) => {
            return (
              hasEveryProp(child.attributes, [
                ACCESSIBLE,
                ACCESSIBILITY_LABEL,
              ]) || isTargetElement(child, context.options, [TEXT], TEXT)
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
