import { Rule } from 'eslint'
import { elementType } from 'jsx-ast-utils'
import { JSXOpeningElement } from '../types'
import { getCustomNames } from './getCustomNames'

export const isTargetElement = (
  node: JSXOpeningElement,
  options: Rule.RuleContext['options'],
  targetNames: string[],
): boolean => {
  const extraTouchables: string[] = getCustomNames(options, 'customComponents')

  const elType = elementType(node)
  return [...targetNames, ...extraTouchables].includes(elType)
}
