import { Rule } from 'eslint'
import { getProp, getPropValue, hasProp } from 'jsx-ast-utils'
import { AccessibilityRole } from 'react-native'
import { ACCESSIBILITY_ROLE, ON_PRESS, TEXT } from '../../constants'
import { createSchema, isTargetElement } from '../../utils'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforces the touchable Text to have a role added.',
    },
    schema: createSchema(),
  },

  create: (context) => {
    return {
      JSXOpeningElement: (node) => {
        /**
         * TODO: Currently it only supports `onPress`. This is because the reading of the operation method provided by `accessibilityRole` etc. may not match the action other than` onPress`.
         */
        if (
          isTargetElement(node, context.options, [TEXT], TEXT) &&
          hasProp(node.attributes, ON_PRESS)
        ) {
          const role = getPropValue<AccessibilityRole>(
            getProp(node.attributes, ACCESSIBILITY_ROLE),
          )
          /**
           * This will not limit the types of roles. This is a rule that warns that there is no role.
           */
          if (!role) {
            context.report({
              node,
              message: 'Touchable `Text` requires `accessibilityRole`.',
            })
          }
        }
      },
    }
  },
}
