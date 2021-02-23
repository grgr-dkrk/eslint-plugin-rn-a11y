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

export type Declaration = Node

export type Expression = Record<string, unknown>

export type Function = {
  // TODO: Can't properly override base types yet.
  // id?: Identifier,
  // body: BlockStatement,

  async: boolean
  defaults: Expression[]
  expression: boolean
  generator: boolean
  params: Pattern[]
  rest?: Identifier
  returnType?: TypeAnnotation
  typeParameters?: TypeParameterDeclaration
}

export type Node = {
  end: number
  innerComments?: Comment[]
  leadingComments?: Comment[]
  loc: {
    end: { column: number; line: number }
    start: { column: number; line: number }
  }
  start: number
  trailingComments?: Comment[]
}

export type Pattern = Record<string, unknown>

export type Statement = Record<string, unknown>

export type Type = Record<string, unknown>

// Concrete Types. Nothing can extend these.

export type CommentLine = Comment & {
  value: string
}

export type CommentBlock = Comment & {
  value: string
}

// Babel concrete types.

export type ArrayExpression<T = Node> = Node &
  Expression & {
    elements: T[]
  }

export type ArrayPattern = Node &
  Pattern & {
    elements: Node[]
    typeAnnotation?: TypeAnnotation
  }

export type ArrowFunctionExpression = Node & {
  // TODO: extends Function
  body: BlockStatement | Expression
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

export type AssignmentExpression = Node &
  Expression & {
    left: Pattern
    operator: AssignmentOperator
    right: Expression
  }

export type AssignmentPattern = Node &
  Pattern & {
    left: Pattern
    right: Expression
  }

export type AwaitExpression = Node &
  Expression & {
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

export type BinaryExpression = Node &
  Expression & {
    left: Expression
    operator: BinaryOperator
    right: Expression
  }

// TODO: What is this?
export type BindExpression = Node &
  Expression & {
    callee: Node
    object: Node
  }

export type BlockStatement = Node &
  Statement & {
    body: Statement[]
  }

export type BreakStatement = Node &
  Statement & {
    label?: Identifier
  }

export type CallExpression = Node &
  Expression & {
    arguments: Expression[] | SpreadElement[]
    callee: Expression
  }

export type CatchClause = Node & {
  body: BlockStatement
  param: Pattern
}

export type ClassBody = Node &
  Declaration & {
    body: Node[]
  }

export type ClassDeclaration = Node &
  Declaration & {
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

export type ClassExpression = Node &
  Expression & {
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

export type ComprehensionBlock = Node & {
  each: boolean
  left: Pattern
  right: Expression
}

export type ComprehensionExpression = Node &
  Expression & {
    body: Expression
    blocks: ComprehensionBlock[]
    filter?: Expression
  }

export type ConditionalExpression = Node &
  Expression & {
    alternate: Expression
    consequent: Expression
    test: Expression
  }

export type ContinueStatement = Node &
  Statement & {
    label?: Identifier
  }

// TODO: Make this correct.
export type Decorator = Node & {
  expression: Expression
}

export type DebuggerStatement = Node

export type DoWhileStatement = Node &
  Statement & {
    body: Statement
    test: Expression
  }

// TODO: Make this correct.
export type DoExpression = Node &
  Expression & {
    body: Statement
  }

export type EmptyStatement = Node & Statement

export type ExpressionStatement = Node &
  Statement & {
    expression: Expression
  }

export type File = Node & {
  program: Program
}

export type ForInStatement = Node &
  Statement & {
    body: Statement
    left: VariableDeclaration | Expression
    right: Expression
  }

// TODO: Make this correct.
export type ForOfStatement = Node &
  Statement & {
    body: Statement
    left: Node
    right: Expression
  }

export type ForStatement = Node &
  Statement & {
    init?: VariableDeclaration | Expression
    test?: Expression
    update?: Expression
    body: Statement
  }

export type FunctionDeclaration = Node &
  Declaration & {
    // TODO: extends Function
    body: BlockStatement
    id: Identifier
  }

export type FunctionExpression = Node &
  Expression & {
    // TODO: extends Function
    body: BlockStatement
    id?: Identifier
  }

export type Identifier = Node &
  Expression &
  Pattern & {
    name: string
    typeAnnotation?: TypeAnnotation
  }

export type IfStatement = Node &
  Statement & {
    alternate?: Statement
    consequent: Statement
    test: Expression
  }

// TODO: Make this correct.
export type ImportDefaultSpecifier = Node & {
  local: Node
}

// TODO: Make this correct.
export type ImportNamespaceSpecifier = Node & {
  local: Node
}

export type ImportDeclaration = Node & {
  specifiers: Node[]
  source: Literal
}

export type ImportSpecifier = Node & {
  imported: Node
  local: Node
}

export type LabeledStatement = Node &
  Statement & {
    body: Statement
    label: Identifier
  }

export type Literal = Node &
  Expression & {
    raw: string
    regex?: { pattern: string; flags: string }
    value?: string | boolean | number | RegExp
  }

type LogicalOperator = '||' | '&&'

export type LogicalExpression = Node &
  Expression & {
    left: Expression
    operator: LogicalOperator
    right: Expression
  }

export type MemberExpression = Node &
  Expression & {
    computed: boolean
    object: Expression
    property: Identifier | Expression
  }

// TODO: Make this correct.
export type MetaProperty = Node & {
  meta: Node
  property: Node
}

export type MethodDefinition = Node &
  Declaration & {
    computed: boolean
    key: Literal | Identifier | Expression
    kind: 'constructor' | 'method' | 'get' | 'set'
    static: boolean
    value: FunctionExpression

    // TODO: Make this correct.
    decorators?: Decorator[]
  }

export type NewExpression = Node &
  Expression & {
    arguments: Expression[] | SpreadElement[]
    callee: Expression
  }

export type Noop = Node

export type ObjectExpression = Node &
  Expression & {
    properties: Property[] | SpreadProperty[]
  }

export type ObjectPattern = Node &
  Pattern & {
    // TODO: Support PropertyPattern[]
    properties: Property[] | SpreadProperty[]
    typeAnnotation?: TypeAnnotation
  }

export type Program = Node & {
  body: Statement[]
}

export type Property = Node & {
  computed: boolean
  key: Literal | Identifier | Expression
  kind: 'init' | 'get' | 'set'
  method: boolean
  shorthand: boolean
  value: Expression | Pattern

  // TODO: Make this correct.
  decorators?: Decorator[]
}

export type RestElement = Node &
  Pattern & {
    argument: Pattern
    typeAnnotation?: TypeAnnotation
  }

export type ReturnStatement = Node &
  Statement & {
    argument?: Expression
  }

export type SequenceExpression = Node &
  Expression & {
    expression: Expression[]
  }

export type SpreadElement = Node & {
  argument: Expression
}

export type SpreadProperty = Node & {
  argument: Expression
}

export type Super = Node

export type SwitchCase = Node & {
  consequent: Statement[]
  test?: Expression
}

export type SwitchStatement = Node &
  Statement & {
    cases: SwitchCase[]
    discriminant: Expression
    lexical: boolean
  }

export type TaggedTemplateExpression = Node &
  Expression & {
    quasi: TemplateLiteral
    tag: Expression
  }

export type TemplateElement = Node & {
  tail: boolean
  value: { cooked: string; raw: string }
}

export type TemplateLiteral = Node &
  Expression & {
    expressions: Expression[]
    quasis: TemplateElement[]
  }

export type ThisExpression = Node & Expression

export type ThrowStatement = Node &
  Statement & {
    argument: Expression
  }

export type TryStatement = Node &
  Statement & {
    block: BlockStatement
    finalizer?: BlockStatement
    guardedHandlers: CatchClause[]
    handler?: CatchClause
    handlers?: CatchClause[]
  }

type UnaryOperator = '-' | '+' | '!' | '~' | 'typeof' | 'void' | 'delete'

export type UnaryExpression = Node &
  Expression & {
    argument: Expression
    operator: UnaryOperator
    prefix: true
  }

type UpdateOperator = '++' | '--'

export type UpdateExpression = Node &
  Expression & {
    argument: Expression
    operator: UpdateOperator
    prefix: boolean
  }

export type VariableDeclaration = Node &
  Declaration & {
    declarations: VariableDeclarator[]
    kind: 'var' | 'let' | 'const'
  }

export type VariableDeclarator = Node & {
  id: Pattern
  init?: Expression
}

export type WhileStatement = Node &
  Statement & {
    body: Statement
    test: Expression
  }

export type WithStatement = Node &
  Statement & {
    body: Statement
    object: Expression
  }

export type YieldExpression = Node &
  Expression & {
    argument?: Expression
    delegate: boolean
  }

// TODO: Make this correct.
export type ExportAllDeclaration = Node & {
  exported: Node
  source: Node
}

// TODO: Make this correct.
export type ExportDefaultDeclaration = Node & {
  declaration: Node
}

// TODO: Make this correct.
export type ExportNamedDeclaration = Node & {
  declaration: Node
  source: Literal
  specifiers: Node[]
}

// TODO: Make this correct.
export type ExportDefaultSpecifier = Node & {
  exported: Node
}

// TODO: Make this correct.
export type ExportNamespaceSpecifier = Node & {
  exported: Node
}

// TODO: Make this correct.
export type ExportSpecifier = Node & {
  local: Node
  exported: Node
}

export type AnyTypeAnnotation = Node & Type

export type ArrayTypeAnnotation = Node &
  Type & {
    elementType: Type
  }

export type BooleanLiteralTypeAnnotation = Node &
  Type & {
    raw: string
    value: boolean
  }

export type BooleanTypeAnnotation = Node & Type

export type ClassImplements = Node & {
  id: Identifier
  typeParameters?: TypeParameterInstantiation

  // TODO: Make this correct.
  superClass?: Expression
}

export type ClassProperty = Node &
  Declaration & {
    computed: boolean
    key: Literal | Identifier | Expression
    static: boolean
    typeAnnotation?: TypeAnnotation
    value?: Expression

    // TODO: Make this correct.
    decorators: Decorator[]
  }

export type DeclareClass = Node &
  Statement & {
    body: ObjectTypeAnnotation
    extends: InterfaceExtends[]
    id: Identifier
    typeParameters?: TypeParameterDeclaration
  }

// TODO: Make this correct.
export type DeclareFunction = Node &
  Statement & {
    id: Identifier
  }

export type DeclareModule = Node &
  Statement & {
    body: BlockStatement
    id: Identifier | Literal
  }

// TODO: Make this correct.
export type DeclareVariable = Node &
  Statement & {
    id: Identifier
  }

export type FunctionTypeAnnotation = Node &
  Type & {
    params: FunctionTypeParam[]
    rest?: FunctionTypeParam
    returnType: Type
    typeParameters?: TypeParameterDeclaration
  }

export type FunctionTypeParam = Node & {
  name: Identifier
  optional: boolean
  typeAnnotation: Type
}

export type GenericTypeAnnotation = Node &
  Type & {
    id: Identifier | QualifiedTypeIdentifier
    typeParameters?: TypeParameterInstantiation
  }

export type InterfaceExtends = Node & {
  id: Identifier
  typeParameters?: TypeParameterInstantiation
}

export type InterfaceDeclaration = Node &
  Statement & {
    body: ObjectTypeAnnotation
    extends: InterfaceExtends[]
    id: Identifier
    typeParameters?: TypeParameterDeclaration
  }

export type IntersectionTypeAnnotation = Node &
  Type & {
    types: Type[]
  }

export type MixedTypeAnnotation = Node & Type

export type NullableTypeAnnotation = Node &
  Type & {
    typeAnnotation: Type
  }

export type NumberLiteralTypeAnnotation = Node &
  Type & {
    raw: string
    value: number
  }

export type NumberTypeAnnotation = Node & Type

export type StringLiteralTypeAnnotation = Node &
  Type & {
    raw: string
    value: string
  }

export type StringTypeAnnotation = Node & Type

export type TupleTypeAnnotation = Node &
  Type & {
    types: Type[]
  }

export type TypeofTypeAnnotation = Node & {
  argument: Type
}

export type TypeAlias = Node &
  Statement & {
    id: Identifier
    right: Type
    typeParameters?: TypeParameterDeclaration
  }

export type TypeAnnotation = Node & {
  typeAnnotation: Type
}

export type TypeCastExpression = Node &
  Expression & {
    expression: Expression
    typeAnnotation: TypeAnnotation
  }

export type TypeParameterDeclaration = Node & {
  params: Identifier[]
}

export type TypeParameterInstantiation = Node & {
  params: Type[]
}

export type ObjectTypeAnnotation = Node &
  Type & {
    callProperties: ObjectTypeCallProperty[]
    indexers: ObjectTypeIndexer[]
    properties: ObjectTypeProperty[]
  }

export type ObjectTypeCallProperty = Node & {
  static: boolean
  value: FunctionTypeAnnotation
}

export type ObjectTypeIndexer = Node & {
  id: Identifier
  key: Type
  value: Type
}

export type ObjectTypeProperty = Node & {
  key: Literal | Identifier
  optional: boolean
  value: Type
}

export type QualifiedTypeIdentifier = Node & {
  id: Identifier
  qualification: Identifier | QualifiedTypeIdentifier
}

export type UnionTypeAnnotation = Node &
  Type & {
    types: Type[]
  }

export type VoidTypeAnnotation = Node & Type

export type JSXAttribute<T = Literal> = Node & {
  name: JSXIdentifier | JSXNamespacedName
  value?: T
}

export type JSXClosingElement = Node & {
  name: Node
}

export type JSXElement = Node &
  Expression & {
    children: JSXElement[]
    closingElement?: JSXClosingElement
    openingElement: JSXOpeningElement
    parent?: JSXElement
  }

export type JSXEmptyExpression = Node & Expression

export type JSXExpressionContainer = Node &
  Expression & {
    expression: Expression
  }

export type JSXIdentifier = Node & {
  name: string
}

export type JSXMemberExpression = Node &
  Expression & {
    computed: boolean
    object: JSXIdentifier | JSXMemberExpression
    property: JSXIdentifier
  }

export type JSXNamespacedName = Node & {
  name: JSXIdentifier
  namespace: JSXIdentifier
}

export type JSXOpeningElement = Node & {
  attributes: Node[]
  name: {
    type: string
    name: string
  }
  type: string
  selfClosing: boolean
  parent: JSXElement
}

export type JSXSpreadAttribute = Node & {
  argument: Expression
}
