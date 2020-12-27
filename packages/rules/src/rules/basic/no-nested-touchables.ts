/**
 * Original: Alex Saunders
 * See: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/src/rules/no-nested-touchables.js
 */

import {
  JSXOpeningElement,
  ACCESSIBLE,
  TOUCHABLE_ELEMENTS,
  BUTTON,
} from '@eslint-plugin-rn-a11y/interfaces'
import { findChild, isTargetElement } from '../../utils'
import { Rule } from 'eslint'
import { elementType, getProp, getPropValue } from 'jsx-ast-utils'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow touchable elements inside `accessible={true}`.',
    },
    schema: [],
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
            isTargetElement(child, context.options, TOUCHABLE_ELEMENTS) ||
            elementType(child) === BUTTON,
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
