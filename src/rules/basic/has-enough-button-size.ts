import { Rule } from 'eslint'
import { hasProp } from 'jsx-ast-utils'
import { BUTTON, STYLE, TOUCHABLE_ELEMENTS } from '../../constants'
import { JSXOpeningElement } from '../../types'
import { getStyleNames, isTargetElement } from '../../utils'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce Touchable components must have enough size.',
    },
    schema: [],
  },

  create: (context) => {
    let styles: string[] = []
    return {
      JSXOpeningElement: (node: JSXOpeningElement) => {
        if (
          isTargetElement(node, context.options, [
            ...TOUCHABLE_ELEMENTS,
            BUTTON,
          ]) &&
          hasProp(node.attributes, STYLE)
        ) {
          const _styles = getStyleNames(node.attributes)
          if (_styles) styles = _styles
        }
      },
      Property: (node) => {
        if (styles?.length) {
          // @ts-ignore
          if (styles.includes(node.parent.parent?.key?.name)) {
            if (
              // @ts-ignore
              (node.key.name === 'width' &&
                // @ts-ignore
                node.value.value < 144) ||
              // @ts-ignore
              (node.key.name === 'height' &&
                // @ts-ignore
                node.value.value < 144)
            ) {
              context.report({
                node,
                // @ts-ignore
                message: `\`${node.key.name}\` on Touchable is too small, 144px or higher is recommended.`,
              })
            }
          }
        }
      },
    }
  },
}
