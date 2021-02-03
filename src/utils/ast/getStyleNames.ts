import { getProp } from 'jsx-ast-utils'
import { STYLE } from '../../constants/props'
import {
  ArrayExpression,
  ConditionalExpression,
  JSXExpressionContainer,
  JSXIdentifier,
  JSXOpeningElement,
  LogicalExpression,
  MemberExpression,
} from '../../types'

/**
 * get all styles from node.attributes.
 */
export const getStyleNames = (
  attributes: JSXOpeningElement['attributes'],
): string[] | void => {
  const styleProp = getProp<JSXOpeningElement>(attributes, STYLE)
  if (!styleProp?.value) return
  const { value } = styleProp
  if (value.type === 'JSXExpressionContainer') {
    const { expression } = (value as unknown) as JSXExpressionContainer
    // style={styles.wrapper}
    if (expression.type === 'MemberExpression') {
      return [(expression.property as JSXIdentifier).name]
    }

    if (expression?.type === 'ArrayExpression') {
      const arrayExpression = expression as ArrayExpression<JSXOpeningElement>
      if (arrayExpression?.elements.length) {
        return arrayExpression?.elements.reduce<string[]>((acc, element) => {
          // style={[styles.wrapper, styles.body]}
          if (element.type === 'MemberExpression') {
            const { property } = (element as unknown) as MemberExpression
            return [...acc, (property as JSXIdentifier).name]
          }

          // style={[styles.wrapper, isActive ? styles.isActive : styles.isNotActive ]}
          if (element.type === 'ConditionalExpression') {
            const {
              consequent,
              alternate,
            } = (element as unknown) as ConditionalExpression
            const properties: string[] = []
            if (consequent.type === 'MemberExpression') {
              properties.push((consequent.property as JSXIdentifier).name)
            }
            if (alternate.type === 'MemberExpression') {
              properties.push((alternate.property as JSXIdentifier).name)
            }
            return [...acc, ...properties]
          }

          // style={[styles.wrapper, isActive && styles.isActive ]}
          if (element.type === 'LogicalExpression') {
            const { right } = (element as unknown) as LogicalExpression
            if (right.type === 'MemberExpression') {
              return [...acc, (right.property as JSXIdentifier).name]
            }
          }
        }, [])
      }
    }
  }
}
