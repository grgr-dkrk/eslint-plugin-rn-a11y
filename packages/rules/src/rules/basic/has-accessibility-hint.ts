/**
 * Original: JP Driver
 * See: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/src/rules/has-accessibility-hint.js
 */

import {
  JSXOpeningElement,
  ACCESSIBILITY_LABEL,
  ACCESSIBILITY_HINT,
} from '@eslint-plugin-rn-a11y/interfaces'
import { Rule } from 'eslint'
import { hasProp } from 'jsx-ast-utils'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce accessibilityHint is used in conjunction with accessibilityLabel.',
    },
    schema: [],
  },

  create: (context) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (
        hasProp(node.attributes, ACCESSIBILITY_LABEL) &&
        !hasProp(node.attributes, ACCESSIBILITY_HINT)
      ) {
        context.report({
          node,
          message: 'has accessibilityLabel prop but no accessibilityHint',
        })
      }
    },
  }),
}
