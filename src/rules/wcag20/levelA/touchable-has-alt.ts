import { isTargetElement, findChild, createSchema } from '../../../utils'
import { getProp, getPropValue, hasEveryProp } from 'jsx-ast-utils'
import {
  TOUCHABLE_ELEMENTS,
  ACCESSIBLE,
  ACCESSIBILITY_LABEL,
  TEXT,
  CUSTOM_TOUCHABLE,
  ACCESSIBILITY_ROLE,
  ROLE_IMAGEBUTTON,
  IMAGE,
  ROLE_BUTTON,
} from '../../../constants'
import { Rule } from 'eslint'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce `Touchable` components must have `accessible` and `accessibilityLabel` prop any children or self',
    },
    schema: createSchema(),
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
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
          // Checks if the child element has a label element.
          const labelElement = findChild(parent, (child) => {
            return (
              hasEveryProp(child.attributes, [
                ACCESSIBLE,
                ACCESSIBILITY_LABEL,
              ]) || isTargetElement(child, context.options, [TEXT], TEXT)
            )
          })
          if (!labelElement) {
            context.report({
              node,
              message:
                'The `Touchable` Element must have accessible text. Need to use `accessible` prop and `accessiblityLabel` for the `Touchable` Element to make it accessible.',
            })
            return
          }
        }
        // Check to role on the Touchable
        if (context.options[0]?.checkRole === true) {
          const childCount = parent.children?.length
          const role = getPropValue(
            getProp(node.attributes, ACCESSIBILITY_ROLE),
          )
          if (childCount === 1) {
            if (
              isTargetElement(
                parent.children[0]?.openingElement,
                context.options,
                [IMAGE],
                IMAGE,
              )
            ) {
              // If the only label was `Image`, then the `imagebutton` role is required.
              if (!role || role !== ROLE_IMAGEBUTTON) {
                context.report({
                  node,
                  message:
                    'Does the button contain only `<Image />`? We recommend that add `accessibilityRole = "imagebutton"` to Touchables.',
                })
              }
            } else {
              // If the only label was `Text`, then the `button` role is required.
              if (!role || role !== ROLE_BUTTON) {
                context.report({
                  node,
                  message:
                    'We recommend that add `accessibilityRole = "button"` to Touchables.',
                })
              }
            }
          }
        }
      }
    },
  }),
}
