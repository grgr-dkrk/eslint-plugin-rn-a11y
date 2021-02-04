/**
 * Original: JP Driver
 * See: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/src/rules/has-valid-accessibility-actions.js
 */

import { Rule } from 'eslint'
import { getProp, getPropValue, hasEveryProp, hasProp } from 'jsx-ast-utils'
import {
  MAGIC_TAP,
  ESCAPE,
  ACTIVATE,
  INCREMENT,
  DECREMENT,
  LONGPRESS,
  ACCESSIBILITY_ACTIONS,
  ON_ACCESSIBILITY_ACTION,
} from '../../constants'
import { createSchema } from '../../utils'

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const standardActions = [
  MAGIC_TAP, // iOS only
  ESCAPE, // iOS only
  ACTIVATE,
  INCREMENT,
  DECREMENT,
  LONGPRESS, // Android only
]

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce both accessibilityActions and onAccessibilityAction props are valid.',
    },
    schema: createSchema(),
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const createErrorMessage = (message: string): void =>
        context.report({
          node,
          message,
        })

      if (
        hasEveryProp(node.attributes, [
          ACCESSIBILITY_ACTIONS,
          ON_ACCESSIBILITY_ACTION,
        ])
      ) {
        const handlerProp = getProp(node.attributes, ON_ACCESSIBILITY_ACTION)
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

        const actionsProp = getProp(node.attributes, ACCESSIBILITY_ACTIONS)
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
        if (hasProp(node.attributes, ACCESSIBILITY_ACTIONS)) {
          createErrorMessage(
            'accessibilityActions: has accessibilityActions but onAccessibilityAction is not a function',
          )
        } else if (hasProp(node.attributes, ON_ACCESSIBILITY_ACTION)) {
          createErrorMessage(
            'accessibilityActions: has onAccessibilityAction function but no accessibilityActions Array',
          )
        }
      }
    },
  }),
}
