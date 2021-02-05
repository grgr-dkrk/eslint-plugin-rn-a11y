import { createSchema, isTargetElement } from '../../utils'
import { Rule } from 'eslint'
import { getProp, getPropValue, hasEveryProp } from 'jsx-ast-utils'
import { IMAGE, ACCESSIBLE, ACCESSIBILITY_LABEL } from '../../constants'

const createErrorMessage = (isSupportedIos: boolean) =>
  `Image should has ${
    isSupportedIos ? `\`accessible\` and ` : ''
  }\`accessibilityLabel\``

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Suggest `Image` must have `accessibilityLabel`.',
    },
    schema: createSchema(),
  },
  create: (context) => ({
    JSXOpeningElement: (node) => {
      if (isTargetElement(node, context.options, [IMAGE], IMAGE)) {
        const isSupportedIos: boolean =
          context.options[0]?.isSupportedIos ?? true
        const targetProps: string[] = [ACCESSIBILITY_LABEL]
        // if `isSupportedIos = true`, need check the `accessible` props too.
        if (isSupportedIos) targetProps.push(ACCESSIBLE)
        if (hasEveryProp(node.attributes, targetProps)) {
          if (!getPropValue(getProp(node.attributes, ACCESSIBILITY_LABEL)))
            context.report({
              node,
              message: createErrorMessage(isSupportedIos),
            })
        } else {
          context.report({
            node,
            message: createErrorMessage(isSupportedIos),
          })
        }
      }
    },
  }),
}
