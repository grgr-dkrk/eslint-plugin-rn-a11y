import { createSchema, isTargetElement } from '../../utils'
import { Rule } from 'eslint'
import { getProp, getPropValue, hasEveryProp } from 'jsx-ast-utils'
import { IMAGE, ACCESSIBLE, ACCESSIBILITY_LABEL } from '../../constants'
import { JSXOpeningElement } from '../../types'

const createErrorMessage = (isSupportedIos: boolean) =>
  `Image should has ${
    isSupportedIos ? `\`accessible\` and ` : ''
  }\`accessibilityLabel\``

const checkProps = (node: JSXOpeningElement, targetProps: string[]) => {
  /**
   * First, check for `accessibleLabel`. Check `accessible` as well, depending on the option.
   */
  if (hasEveryProp(node.attributes, targetProps)) {
    /**
     * Even if the first condition is met, if `accessibleLabel` is an empty value, it will not be recognized. So check it.
     */
    if (!getPropValue(getProp(node.attributes, ACCESSIBILITY_LABEL))) {
      return false
    }
    return true
  } else {
    return false
  }
}

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
        /**
         * if `isSupportedIos = true`, need check the `accessible` props too.
         */
        const isSupportedIos: boolean =
          context.options[0]?.isSupportedIos ?? true
        const targetProps: string[] = [ACCESSIBILITY_LABEL]
        if (isSupportedIos) targetProps.push(ACCESSIBLE)

        // check on `Image`
        const hasAccessiblePropsOnImage = checkProps(node, targetProps)

        /**
         * If the `Image` check is disabled, check the parent element.
         * `Image` may be included as a child of `Touchable`.
         * If the ancestor is accessible, we will only search for the parent here, in case it becomes inaccessible to the `View` that wraps the sibling `Image`.
         */
        if (!hasAccessiblePropsOnImage) {
          const parentNode = node.parent?.parent?.openingElement
            ? node.parent.parent.openingElement
            : null
          if (parentNode) {
            // check on parent
            const hasAccessiblePropsOnParent = checkProps(
              parentNode,
              targetProps,
            )
            if (!hasAccessiblePropsOnParent)
              // Not valid if Props does not even exist in the parent of the inaccessible `Image`.
              context.report({
                node,
                message: createErrorMessage(isSupportedIos),
              })
          } else {
            // It is also invalid if the inaccessible `Image` has no parent.
            context.report({
              node,
              message: createErrorMessage(isSupportedIos),
            })
          }
        }
      }
    },
  }),
}
