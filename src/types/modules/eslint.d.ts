/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AST,
  Rule as OriginalRule,
  RuleTester as OriginalRuleTester,
} from 'eslint'
import {
  JSXElement as JSXElementType,
  JSXOpeningElement as JSXOpeningElementType,
} from '../ast'
import * as ESTree from 'ESTree'

export namespace Rule {
  interface RuleModule extends OriginalRule.RuleModule {
    create(context: RuleContext): RuleListener
  }

  interface RuleContext extends OriginalRule.RuleContext {
    report(descriptor: ReportDescriptor): void
  }

  type ReportDescriptor = OriginalRule.ReportDescriptorMessage &
    ReportDescriptorLocation & {
      node: JSXOpeningElementType | JSXElementType
    }

  interface NodeListener extends OriginalRule.NodeListener {
    JSXOpeningElement?: (
      node: JSXOpeningElementType & OriginalRule.NodeParentExtension,
    ) => void
  }
  interface RuleListener extends OriginalRule.RuleListener {
    JSXOpeningElement?: (
      node: JSXOpeningElementType & OriginalRule.NodeParentExtension,
    ) => void
    Property?: (
      node: ESTree.Property & OriginalRule.NodeParentExtension,
    ) => void
    [key: string]:
      | ((codePath: CodePath, node: Node) => void)
      | ((segment: CodePathSegment, node: Node) => void)
      | ((
          fromSegment: CodePathSegment,
          toSegment: CodePathSegment,
          node: Node,
        ) => void)
      | ((node: Node) => void)
      | NodeListener[keyof NodeListener]
      | undefined
  }
}

export class RuleTester extends OriginalRuleTester {
  constructor(config?: any)

  run(
    name: string,
    rule: Rule.RuleModule,
    tests: {
      valid?: Array<string | RuleTester.ValidTestCase>
      invalid?: RuleTester.InvalidTestCase[]
    },
  ): void
}
