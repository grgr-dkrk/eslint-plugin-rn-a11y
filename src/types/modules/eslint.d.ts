/* eslint-disable @typescript-eslint/no-unused-vars */
import { Rule as OriginalRule, RuleTester as OriginalRuleTester } from 'eslint'
import {
  JSXElement as JSXElementType,
  JSXOpeningElement as JSXOpeningElementType,
} from '../ast'

declare module 'eslint' {
  declare namespace Rule {
    interface RuleContext extends OriginalRule.RuleContext {
      report(
        descriptor: OriginalRule.ReportDescriptorMessage & {
          node: JSXOpeningElementType
        },
      ): void
    }
    interface NodeListener extends OriginalRule.NodeListener {
      JSXOpeningElement?: (node: JSXOpeningElementType) => void
    }
    interface RuleListener extends OriginalRule.RuleListener {
      JSXOpeningElement?: (node: JSXOpeningElementType) => void
    }
  }
}
