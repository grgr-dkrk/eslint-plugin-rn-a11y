/**
 * Original: JP Driver
 * See: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/src/rules/has-accessibility-hint.js
 */

import { Rule } from 'eslint'
import { getProp, getPropValue, hasEveryProp, hasProp } from 'jsx-ast-utils'
import { JSXOpeningElement } from '../../types'

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const standardActions = [
  'magicTap', // iOS only
  'escape', // iOS only
  'activate',
  'increment',
  'decrement',
  'longpress', // Android only
]

export const rule: Rule.RuleModule = {
  meta: {
    docs: {},
    schema: [],
  },

  create: (context) => ({
    // @ts-ignore
    JSXOpeningElement: (node: JSXOpeningElement) => {
      const createErrorMessage = (message: string): void =>
        context.report({
          // @ts-ignore
          node,
          message,
        })

      if (
        hasEveryProp(node.attributes, [
          'accessibilityActions',
          'onAccessibilityAction',
        ])
      ) {
        const handlerProp = getProp(node.attributes, 'onAccessibilityAction')
        const handlerPropType = handlerProp.value.expression.type
        // CallExpressions are always assumed valid
        if (handlerPropType !== 'CallExpression') {
          const handlerPropValue = getPropValue(handlerProp)
          if (typeof handlerPropValue !== 'function') {
            createErrorMessage(
              'accessibilityActions: has accessibilityActions but onAccessibilityAction is not a function',
            )
          }
        }

        const actionsProp = getProp(node.attributes, 'accessibilityActions')
        const actionsPropType = actionsProp.value.expression.type
        // CallExpressions are always assumed valid
        if (actionsPropType !== 'CallExpression') {
          const attrValue = getPropValue(actionsProp)

          if (!Array.isArray(attrValue)) {
            createErrorMessage('accessibilityActions: value must be an Array')
          } else if (attrValue.length === 0) {
            createErrorMessage('accessibilityActions: Array cannot be empty')
          } else {
            attrValue.forEach((action: any) => {
              if (!action.name) {
                createErrorMessage('accessibilityActions: action missing name')
              } else if (
                standardActions.indexOf(action.name) < 0 &&
                !action.label
              ) {
                createErrorMessage(
                  `accessibilityActions: custom action "${action.name}" missing label`,
                )
              }
              if (
                Object.keys(action).some((f) => f !== 'name' && f !== 'label')
              ) {
                createErrorMessage(
                  `accessibilityActions: action "${action.name}" contains unrecognised keys`,
                )
              }
            })
          }
        }
      } else {
        if (hasProp(node.attributes, 'accessibilityActions')) {
          createErrorMessage(
            'accessibilityActions: has accessibilityActions but onAccessibilityAction is not a function',
          )
        } else if (hasProp(node.attributes, 'onAccessibilityAction')) {
          createErrorMessage(
            'accessibilityActions: has onAccessibilityAction function but no accessibilityActions Array',
          )
        }
      }
    },
  }),
}
