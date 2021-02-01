/**
 * original: ast-types-flow
 * https://github.com/kyldvs/ast-types-flow
 */

export type Comment = {
  end: number
  loc: {
    end: { column: number; line: number }
    start: { column: number; line: number }
  }
  start: number
}

export type Declaration = {
  // extends Node
}

export type Expression = Record<string, unknown>

export type Function = {
  // TODO: Can't properly override base types yet.
  // id?: Identifier,
  // body: BlockStatement,

  async: boolean
  defaults: Expression[]
  expression: boolean
  generator: boolean
  params: Array<Pattern>
  rest?: Identifier
  returnType?: TypeAnnotation
  typeParameters?: TypeParameterDeclaration
}

export type Node = {
  end: number
  innerComments?: Array<Comment>
  leadingComments?: Array<Comment>
  loc: {
    end: { column: number; line: number }
    start: { column: number; line: number }
  }
  start: number
  trailingComments?: Array<Comment>
}

export type Pattern = Record<string, unknown>

export type Statement = Record<string, unknown>

export type Type = Record<string, unknown>

// Concrete Types. Nothing can extend these.

export type CommentLine = {
  // extends Comment
  value: string
}

export type CommentBlock = {
  // extends Comment
  value: string
}

// Babel concrete types.

export type ArrayExpression = {
  // extends Node, Expression
  elements: Node[]
}

export type ArrayPattern = {
  // extends Node, Pattern
  elements: Node[]
  typeAnnotation?: TypeAnnotation
}

export type ArrowFunctionExpression = {
  // extends Node, Function
  body: Node // BlockStatement | Expression,
  id?: Identifier
}

type AssignmentOperator =
  | '='
  | '+='
  | '-='
  | '*='
  | '/='
  | '%='
  | '<<='
  | '>>='
  | '>>>='
  | '|='
  | '^='
  | '&='

export type AssignmentExpression = {
  // extends Node, Expression
  left: Pattern
  operator: AssignmentOperator
  right: Expression
}

export type AssignmentPattern = {
  // extends Node, Pattern
  left: Pattern
  right: Expression
}

export type AwaitExpression = {
  // extends Node, Expression
  all: boolean
  argument?: Expression
}

type BinaryOperator =
  | '=='
  | '!='
  | '==='
  | '!=='
  | '<'
  | '<='
  | '>'
  | '>='
  | '<<'
  | '>>'
  | '>>>'
  | '+'
  | '-'
  | '*'
  | '/'
  | '%'
  | '&'
  | '|'
  | '^'
  | 'in'
  | 'instanceof'
  | '..'

export type BinaryExpression = {
  // extends Node, Expression
  left: Expression
  operator: BinaryOperator
  right: Expression
}

// TODO: What is this?
export type BindExpression = {
  // extends Node, Expression
  callee: Node
  object: Node
}

export type BlockStatement = {
  // extends Node, Statement
  body: Array<Statement>
}

export type BreakStatement = {
  // extends Node, Statement
  label?: Identifier
}

export type CallExpression = {
  // extends Node, Expression
  arguments: Node[] // Array<Expression | SpreadElement>
  callee: Expression
}

export type CatchClause = {
  // extends Node
  body: BlockStatement
  param: Pattern
}

export type ClassBody = {
  // extends Node, Declaration
  body: Node[]
}

export type ClassDeclaration = {
  // extends Node, Declaration
  body: ClassBody
  id?: Identifier
  superClass?: Expression

  // TODO: Get proper types.
  decorators: any
  superTypeParameters: any
  typeParameters: any

  // TODO: Recast parse error.
  // 'implements': Array<ClassImplements>,
}

export type ClassExpression = {
  // extends Node, Expression
  body: ClassBody
  id?: Identifier
  superClass?: Expression

  // TODO: Get proper types.
  decorators: any
  superTypeParameters: any
  typeParameters: any

  // TODO: Recast parse error.
  // 'implements': Array<ClassImplements>,
}

export type ComprehensionBlock = {
  // extends Node
  each: boolean
  left: Pattern
  right: Expression
}

export type ComprehensionExpression = {
  // extends Node, Expression
  body: Expression
  blocks: Array<ComprehensionBlock>
  filter?: Expression
}

export type ConditionalExpression = {
  // extends Node, Expression
  alternate: Expression
  consequent: Expression
  test: Expression
}

export type ContinueStatement = {
  // extends Node, Statement
  label?: Identifier
}

// TODO: Make this correct.
export type Decorator = {
  // extends Node
  expression: Expression
}

export type DebuggerStatement = {
  // extends Node
}

export type DoWhileStatement = {
  // extends Node, Statement
  body: Statement
  test: Expression
}

// TODO: Make this correct.
export type DoExpression = {
  // extends Node, Expression
  body: Statement
}

export type EmptyStatement = {
  // extends Node, Statement
}

export type ExpressionStatement = {
  // extends Node, Statement
  expression: Expression
}

export type File = {
  // extends Node
  program: Program
}

export type ForInStatement = {
  // extends Node, Statement
  body: Statement
  left: Node // VariableDeclaration | Expression
  right: Expression
}

// TODO: Make this correct.
export type ForOfStatement = {
  // extends Node, Statement
  body: Statement
  left: Node
  right: Expression
}

export type ForStatement = {
  // extends Node, Statement
  init?: Node // ?(VariableDeclaration | Expression)
  test?: Expression
  update?: Expression
  body: Statement
}

export type FunctionDeclaration = {
  // extends Node, Function, Declaration
  body: BlockStatement
  id: Identifier
}

export type FunctionExpression = {
  // extends Node, Expression, Function
  body: BlockStatement
  id?: Identifier
}

export type Identifier = {
  // extends Node, Expression, Pattern
  name: string
  typeAnnotation?: TypeAnnotation
}

export type IfStatement = {
  // extends Node, Statement
  alternate?: Statement
  consequent: Statement
  test: Expression
}

// TODO: Make this correct.
export type ImportDefaultSpecifier = {
  // extends Node
  local: Node
}

// TODO: Make this correct.
export type ImportNamespaceSpecifier = {
  // extends Node
  local: Node
}

// TODO: Make this correct.
export type ImportDeclaration = {
  // extends Node
  specifiers: Node[]
  source: Literal
}

// TODO: Make this correct.
export type ImportSpecifier = {
  // extends Node
  imported: Node
  local: Node
}

export type LabeledStatement = {
  // extends Node, Statement
  body: Statement
  label: Identifier
}

export type Literal = {
  // extends Node, Expression
  raw: string
  regex?: { pattern: string; flags: string }
  value?: string | boolean | number | RegExp
}

type LogicalOperator = '||' | '&&'

export type LogicalExpression = {
  // extends Node, Expression
  left: Expression
  operator: LogicalOperator
  right: Expression
}

export type MemberExpression = {
  // extends Node, Expression
  computed: boolean
  object: Expression
  property: Node // Identifier | Expression
}

// TODO: Make this correct.
export type MetaProperty = {
  // extends Node
  meta: Node
  property: Node
}

export type MethodDefinition = {
  // extends Node, Declaration
  computed: boolean
  key: Node // Literal | Identifier | Expression
  kind: 'constructor' | 'method' | 'get' | 'set'
  static: boolean
  value: FunctionExpression

  // TODO: Make this correct.
  decorators?: Array<Decorator>
}

export type NewExpression = {
  // extends Node, Expression
  arguments: Node[] // Array<Expression | SpreadElement>
  callee: Expression
}

export type Noop = {
  // extends Node
}

export type ObjectExpression = {
  // extends Node, Expression
  properties: Node[] // Array<Property | SpreadProperty>
}

export type ObjectPattern = {
  // extends Node, Pattern
  properties: Node[] // Array<PropertyPattern | Property | SpreadProperty>
  typeAnnotation?: TypeAnnotation
}

export type Program = {
  // extends Node
  body: Array<Statement>
}

export type Property = {
  // extends Node
  computed: boolean
  key: Node // Literal | Identifier | Expression
  kind: 'init' | 'get' | 'set'
  method: boolean
  shorthand: boolean
  value: Node // Expression | Pattern

  // TODO: Make this correct.
  decorators?: Array<Decorator>
}

export type RestElement = {
  // extends Node, Pattern
  argument: Pattern
  typeAnnotation?: TypeAnnotation
}

export type ReturnStatement = {
  // extends Node, Statement
  argument?: Expression
}

export type SequenceExpression = {
  // extends Node, Expression
  expression: Array<Expression>
}

export type SpreadElement = {
  // extends Node
  argument: Expression
}

export type SpreadProperty = {
  // extends Node
  argument: Expression
}

export type Super = {
  // extends Node
}

export type SwitchCase = {
  // extends Node
  consequent: Array<Statement>
  test?: Expression
}

export type SwitchStatement = {
  // extends Node, Statement
  cases: Array<SwitchCase>
  discriminant: Expression
  lexical: boolean
}

export type TaggedTemplateExpression = {
  // extends Node, Expression
  quasi: TemplateLiteral
  tag: Expression
}

export type TemplateElement = {
  // extends Node
  tail: boolean
  value: { cooked: string; raw: string }
}

export type TemplateLiteral = {
  // extends Node, Expression
  expressions: Array<Expression>
  quasis: Array<TemplateElement>
}

export type ThisExpression = {
  // extends Node, Expression
}

export type ThrowStatement = {
  // extends Node, Statement
  argument: Expression
}

export type TryStatement = {
  // extends Node, Statement
  block: BlockStatement
  finalizer?: BlockStatement
  guardedHandlers: Array<CatchClause>
  handler?: CatchClause
  handlers?: Array<CatchClause>
}

type UnaryOperator = '-' | '+' | '!' | '~' | 'typeof' | 'void' | 'delete'

export type UnaryExpression = {
  // extends Node, Expression
  argument: Expression
  operator: UnaryOperator
  prefix: true
}

type UpdateOperator = '++' | '--'

export type UpdateExpression = {
  // extends Node, Expression
  argument: Expression
  operator: UpdateOperator
  prefix: boolean
}

export type VariableDeclaration = {
  // extends Node, Declaration
  declarations: Array<VariableDeclarator>
  kind: 'var' | 'let' | 'const'
}

export type VariableDeclarator = {
  // extends Node
  id: Pattern
  init?: Expression
}

export type WhileStatement = {
  // extends Node, Statement
  body: Statement
  test: Expression
}

export type WithStatement = {
  // extends Node, Statement
  body: Statement
  object: Expression
}

export type YieldExpression = {
  // extends Node, Expression
  argument?: Expression
  delegate: boolean
}

// TODO: Make this correct.
export type ExportAllDeclaration = {
  // extends Node
  exported: Node
  source: Node
}

// TODO: Make this correct.
export type ExportDefaultDeclaration = {
  // extends Node
  declaration: Node
}

// TODO: Make this correct.
export type ExportNamedDeclaration = {
  // extends Node
  declaration: Node
  source: Literal
  specifiers: Node[]
}

// TODO: Make this correct.
export type ExportDefaultSpecifier = {
  // extends Node
  exported: Node
}

// TODO: Make this correct.
export type ExportNamespaceSpecifier = {
  // extends Node
  exported: Node
}

// TODO: Make this correct.
export type ExportSpecifier = {
  // extends Node
  local: Node
  exported: Node
}

export type AnyTypeAnnotation = {
  // extends Node, Type
}

export type ArrayTypeAnnotation = {
  // extends Node, Type
  elementType: Type
}

export type BooleanLiteralTypeAnnotation = {
  // extends Node, Type
  raw: string
  value: boolean
}

export type BooleanTypeAnnotation = {
  // extends Node, Type
}

export type ClassImplements = {
  // extends Node
  id: Identifier
  typeParameters?: TypeParameterInstantiation

  // TODO: Make this correct.
  superClass?: Expression
}

export type ClassProperty = {
  // extends Node, Declaration
  computed: boolean
  key: Node // Literal | Identifier | Expression
  static: boolean
  typeAnnotation?: TypeAnnotation
  value?: Expression

  // TODO: Make this correct.
  decorators: Array<Decorator>
}

export type DeclareClass = {
  // extends Node, Statement
  body: ObjectTypeAnnotation
  extends: Array<InterfaceExtends>
  id: Identifier
  typeParameters?: TypeParameterDeclaration
}

// TODO: Make this correct.
export type DeclareFunction = {
  // extends Node, Statement
  id: Identifier
}

export type DeclareModule = {
  // extends Node, Statement
  body: BlockStatement
  id: Node // Identifier | Literal
}

// TODO: Make this correct.
export type DeclareVariable = {
  // extends Node, Statement
  id: Identifier
}

export type FunctionTypeAnnotation = {
  // extends Node, Type
  params: Array<FunctionTypeParam>
  rest?: FunctionTypeParam
  returnType: Type
  typeParameters?: TypeParameterDeclaration
}

export type FunctionTypeParam = {
  // extends Node
  name: Identifier
  optional: boolean
  typeAnnotation: Type
}

export type GenericTypeAnnotation = {
  // extends Node, Type
  id: Node // Identifier | QualifiedTypeIdentifier
  typeParameters?: TypeParameterInstantiation
}

export type InterfaceExtends = {
  // extends Node
  id: Identifier
  typeParameters?: TypeParameterInstantiation
}

export type InterfaceDeclaration = {
  // extends Node, Statement
  body: ObjectTypeAnnotation
  extends: Array<InterfaceExtends>
  id: Identifier
  typeParameters?: TypeParameterDeclaration
}

export type IntersectionTypeAnnotation = {
  // extends Node, Type
  types: Array<Type>
}

export type MixedTypeAnnotation = {
  // extends Node, Type
}

export type NullableTypeAnnotation = {
  // extends Node, Type
  typeAnnotation: Type
}

export type NumberLiteralTypeAnnotation = {
  // extends Node, Type
  raw: string
  value: number
}

export type NumberTypeAnnotation = {
  // extends Node, Type
}

export type StringLiteralTypeAnnotation = {
  // extends Node, Type
  raw: string
  value: string
}

export type StringTypeAnnotation = {
  // extends Node, Type
}

export type TupleTypeAnnotation = {
  // extends Node, Type
  types: Array<Type>
}

export type TypeofTypeAnnotation = {
  // extends Node
  argument: Type
}

export type TypeAlias = {
  // extends Node, Statement
  id: Identifier
  right: Type
  typeParameters?: TypeParameterDeclaration
}

export type TypeAnnotation = {
  // extends Node
  typeAnnotation: Type
}

export type TypeCastExpression = {
  // extends Node, Expression
  expression: Expression
  typeAnnotation: TypeAnnotation
}

export type TypeParameterDeclaration = {
  // extends Node
  params: Array<Identifier>
}

export type TypeParameterInstantiation = {
  // extends Node
  params: Array<Type>
}

export type ObjectTypeAnnotation = {
  // extends Node, Type
  callProperties: Array<ObjectTypeCallProperty>
  indexers: Array<ObjectTypeIndexer>
  properties: Array<ObjectTypeProperty>
}

export type ObjectTypeCallProperty = {
  // extends Node
  static: boolean
  value: FunctionTypeAnnotation
}

export type ObjectTypeIndexer = {
  // extends Node
  id: Identifier
  key: Type
  value: Type
}

export type ObjectTypeProperty = {
  // extends Node
  key: Node // Literal | Identifier
  optional: boolean
  value: Type
}

export type QualifiedTypeIdentifier = {
  // extends Node
  id: Identifier
  qualification: Node // Identifier | QualifiedTypeIdentifier
}

export type UnionTypeAnnotation = {
  // extends Node, Type
  types: Array<Type>
}

export type VoidTypeAnnotation = {
  // extends Node, Type
}

export type JSXAttribute = {
  // extends Node
  name: Node // JSXIdentifier | JSXNamespacedName
  value?: Node // ?(Literal | JSXExpressionContainer)
}

export type JSXClosingElement = {
  // extends Node
  name: Node
}

export type JSXElement = {
  // extends Node, Expression
  children: JSXElement[]
  closingElement?: JSXClosingElement
  openingElement: JSXOpeningElement
}

export type JSXEmptyExpression = {
  // extends Node, Expression
}

export type JSXExpressionContainer = {
  // extends Node, Expression
  expression: Expression
}

export type JSXIdentifier = {
  // extends Node
  name: string
}

export type JSXMemberExpression = {
  // extends Node, Expression
  computed: boolean
  object: Node // JSXIdentifier | JSXMemberExpression
  property: JSXIdentifier
}

export type JSXNamespacedName = {
  // extends Node
  name: JSXIdentifier
  namespace: JSXIdentifier
}

export type JSXOpeningElement = {
  attributes: Node[]
  name: {
    type: string
    name: string
  }
  type: string
  selfClosing: boolean
  parent: JSXElement
}

export type JSXSpreadAttribute = {
  // extends Node
  argument: Expression
}
