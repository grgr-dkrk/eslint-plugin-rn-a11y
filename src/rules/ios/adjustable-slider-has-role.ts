import { Rule } from 'eslint'
import { getProp, getPropValue, hasProp } from 'jsx-ast-utils'
import { ACCESSIBILITY_ACTIONS, ACCESSIBILITY_ROLE } from '../../constants'
import { AccessibilityActionInfo } from 'react-native'
import { createSchema } from '../../utils'

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce adjustable slider has `adjustable` role for iOS.',
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

      if (hasProp(node.attributes, ACCESSIBILITY_ACTIONS)) {
        const actionsProp = getProp(node.attributes, ACCESSIBILITY_ACTIONS)
        const actionsPropType = actionsProp.value.expression.type
        if (actionsPropType !== 'CallExpression') {
          const attrValues = getPropValue<AccessibilityActionInfo[]>(
            actionsProp,
          )

          if (
            attrValues.some(
              (val) => val.name === 'increment' || val.name === 'decrement',
            )
          ) {
            if (
              getPropValue<string>(
                getProp(node.attributes, ACCESSIBILITY_ROLE),
              ) !== 'adjustable'
            ) {
              createErrorMessage(
                '`accessibilityRole="adjustable"` role is required for iOS to recognize components that can be incremented or decremented.',
              )
            }
          }
        }
      }
    },
  }),
}
