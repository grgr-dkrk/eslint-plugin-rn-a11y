import { Rule } from 'eslint'
import { elementType } from 'jsx-ast-utils'
import { JSXOpeningElement } from '../../types/ast'
import { getCustomNames } from '../getCustomNames'

/**
 * Returns whether the `node` passed as an argument is a component contained in `targetNames`.
 * @param node
 * @param options options of `eslintrc`
 * @param targetNames target component names
 * @param customComponentProp Custom components which included in the target
 */
export const isTargetElement = (
  node: JSXOpeningElement,
  options: Rule.RuleContext['options'],
  targetNames: string[],
  customComponentProp: string,
): boolean => {
  const customComponentNames: string[] = getCustomNames(
    options,
    customComponentProp,
  )

  const elType = elementType(node)
  return [...targetNames, ...customComponentNames].includes(elType)
}
