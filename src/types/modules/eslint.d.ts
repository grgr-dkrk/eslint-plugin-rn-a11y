import { Rule as OriginalRule, Scope as OriginalScope } from 'eslint'
import { JSXOpeningElement } from '../ast'
import * as ESTree from 'estree'

export namespace Rule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface RuleModule extends OriginalRule.RuleModule {
    create(context: RuleContext): OriginalRule.RuleListener
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface NodeListener extends OriginalRule.NodeListener {
    JSXOpeningElement?: (
      node: JSXOpeningElement & OriginalRule.NodeParentExtension,
    ) => void
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface RuleListener extends OriginalRule.RuleListener {
    [key: string]: ((node: JSXOpeningElement) => void) | undefined
  }
}
