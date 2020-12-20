/**
 * Original: JP Driver
 * See: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/src/rules/has-accessibility-hint.js
 */

import { Rule } from 'eslint'
import { hasProp } from 'jsx-ast-utils'
import { JSXOpeningElement } from '../../types'

export const rule: Rule.RuleModule = {
  meta: {
    docs: {},
    schema: [],
  },

  create: (context) => ({
    // @ts-ignore
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (
        hasProp(node.attributes, 'accessibilityLabel') &&
        !hasProp(node.attributes, 'accessibilityHint')
      ) {
        context.report({
          // @ts-ignore
          node,
          message: 'has accessibilityLabel prop but no accessibilityHint',
        })
      }
    },
  }),
}
