import { Rule } from 'eslint'

export const getCustomNames = (
  options: Rule.RuleContext['options'],
  name: string,
): string[] =>
  options[0] &&
  Object.prototype.hasOwnProperty.call(options[0], name) &&
  Array.isArray(options[0][name])
    ? [...options[0][name]]
    : []
