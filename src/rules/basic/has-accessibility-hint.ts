/**
 * Original: JP Driver
 * See: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/src/rules/has-accessibility-hint.js
 */

import { Rule } from 'eslint'
import { hasProp } from 'jsx-ast-utils'
import { ACCESSIBILITY_LABEL, ACCESSIBILITY_HINT } from '../../constants'
import { JSXOpeningElement } from '../../types'
import { createSchema } from '../../utils'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce accessibilityHint is used in conjunction with accessibilityLabel.',
    },
    schema: createSchema(),
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
