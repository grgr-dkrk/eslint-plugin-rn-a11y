import { getProp } from 'jsx-ast-utils'
import { STYLE } from '../../constants/props'
import { JSXOpeningElement } from '../../types'

/**
 * get all styles from node.attributes.
 */
export const getStyleNames = (
  attributes: JSXOpeningElement['attributes'],
): string[] | void => {
  const styleProp = getProp(attributes, STYLE)
  if (!styleProp?.value) return
  const { value } = styleProp
  if (value.type === 'JSXExpressionContainer') {
    // style={styles.wrapper}
    if (value.expression?.type === 'MemberExpression') {
      return [value.expression?.property.name]
    }

    if (
      value.expression?.type === 'ArrayExpression' &&
      value.expression?.elements.length
    ) {
      return value.expression?.elements.reduce((acc, element) => {
        // style={[styles.wrapper, styles.body]}
        if (element.type === 'MemberExpression') {
          return [...acc, element.property.name]
        }

        // style={[styles.wrapper, isActive ? styles.isActive : styles.isNotActive ]}
        if (element.type === 'ConditionalExpression') {
          const properties: string[] = []
          if (element.consequent.type === 'MemberExpression') {
            properties.push(element.consequent.property.name)
          }
          if (element.alternate.type === 'MemberExpression') {
            properties.push(element.alternate.property.name)
          }
          return [...acc, ...properties]
        }

        // style={[styles.wrapper, isActive && styles.isActive ]}
        if (
          element.type === 'LogicalExpression' &&
          element.right.type === 'MemberExpression'
        ) {
          return [...acc, element.right.property.name]
        }
      }, [])
    }
  }
}
