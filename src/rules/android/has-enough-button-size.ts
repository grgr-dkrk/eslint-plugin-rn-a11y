import { Rule } from '../../types/modules/eslint'
import { hasProp } from 'jsx-ast-utils'
import {
  TOUCHABLE_ELEMENTS,
  BUTTON,
  STYLE,
  CUSTOM_TOUCHABLE,
} from '../../constants'
import { AndroidScreenDensity } from '../../types'
import {
  createSchema,
  densityToPx,
  getStyleNames,
  isTargetElement,
  styleValueToPx,
} from '../../utils'

export const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforces `Touchable` components have enough size.',
    },
    schema: createSchema(),
  },

  create: (context) => {
    let styles: string[] = []
    return {
      JSXOpeningElement: (node) => {
        if (
          isTargetElement(
            node,
            context.options,
            [...TOUCHABLE_ELEMENTS, BUTTON],
            CUSTOM_TOUCHABLE,
          ) &&
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
            const density: AndroidScreenDensity =
              context.options[0]?.density ?? 'xxhdpi'
            const px = densityToPx(density)
            if (
              // @ts-ignore
              (node.key.name === 'width' &&
                // @ts-ignore
                styleValueToPx(node.value.value) < px) ||
              // @ts-ignore
              (node.key.name === 'height' &&
                // @ts-ignore
                styleValueToPx(node.value.value) < px)
            ) {
              context.report({
                node,
                // @ts-ignore
                message: `\`${node.key.name}\` on Touchable is too small, ${px}px or higher is recommended.`,
              })
            }
          }
        }
      },
    }
  },
}
