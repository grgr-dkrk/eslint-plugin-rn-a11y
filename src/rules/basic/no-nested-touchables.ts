/**
 * Original: Alex Saunders
 * See: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/src/rules/no-nested-touchables.js
 */

import { createSchema, findChild, isTargetElement } from '../../utils'
import { Rule } from 'eslint'
import { getProp, getPropValue } from 'jsx-ast-utils'
import {
  ACCESSIBLE,
  TOUCHABLE_ELEMENTS,
  BUTTON,
  CUSTOM_TOUCHABLE,
} from '../../constants'
import { JSXOpeningElement } from '../../types'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow touchable elements inside `accessible={true}`.',
    },
    schema: createSchema(),
  },

  create: (context) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      const { parent } = node

      const accessibleProp = getProp(node.attributes, ACCESSIBLE)
      const hasAccessible = getPropValue(accessibleProp)

      if (hasAccessible) {
        const clickableChild = findChild(
          parent,
          (child) =>
            isTargetElement(
              child,
              context.options,
              TOUCHABLE_ELEMENTS,
              CUSTOM_TOUCHABLE,
            ) || isTargetElement(child, context.options, [BUTTON], BUTTON),
        )

        if (clickableChild) {
          context.report({
            node,
            message:
              'Elements with `accessible={true}` must not have any clickable elements inside',
          })
        }
      }
    },
  }),
}
