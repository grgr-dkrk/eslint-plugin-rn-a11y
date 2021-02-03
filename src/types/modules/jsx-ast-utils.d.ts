type HasPropOptions = {
  ignoreCase?: boolean
  spreadStrict?: boolean
}

type JSX_NODE_ELEMENTS = import('../ast').Node[]

declare module 'jsx-ast-utils' {
  /**
   * Returns boolean indicating whether an `prop` exists as an attribute on a JSX element node.
   */
  export function hasProp(
    attributes: JSX_NODE_ELEMENTS,
    prop: string,
    options?: {
      ignoreCase?: boolean
      spreadStrict?: boolean
    },
  ): boolean

  /**
   * Returns a boolean indicating if any of `props` in prop argument exist on the node.
   */
  export function hasAnyProp(
    attributes: JSX_NODE_ELEMENTS,
    prop: string[],
    options?: {
      ignoreCase?: boolean
      spreadStrict?: boolean
    },
  ): boolean

  /**
   * Returns a boolean indicating if any of `props` in prop argument exist on the node.
   */
  export function hasEveryProp(
    attributes: JSX_NODE_ELEMENTS,
    prop: string[],
    options?: {
      ignoreCase?: boolean
      spreadStrict?: boolean
    },
  ): boolean

  /**
   * Returns the JSXAttribute itself or undefined, indicating the prop is not present on the JSXOpeningElement.
   */
  export function getProp<T = import('../ast').JSXExpressionContainer>(
    attributes: JSX_NODE_ELEMENTS,
    prop: string,
    options?: {
      ignoreCase?: boolean
    },
  ): import('../ast').JSXAttribute<T> | undefined

  /**
   * Returns the tagName associated with a JSXElement.
   */
  export function elementType(
    node: import('../ast').JSXOpeningElement | import('../ast').JSXElement,
  ): string

  /**
   * Returns the value of a given attribute. Different types of attributes have their associated values in different properties on the object. This function should return the most closely associated value with the intention of the JSX.
   */
  export function getPropValue<
    T = string | number | boolean | null | symbol | bigint
  >(prop: Record<string, unknown>): T | undefined

  /**
   * Returns the value of a given attribute. Different types of attributes have their associated values in different properties on the object. This function should return a value only if we can extract a literal value from its attribute (i.e. values that have generic types in JavaScript - strings, numbers, booleans, etc.)
   */
  export function getLiteralPropValue<
    T = string | number | boolean | null | symbol | bigint
  >(prop: Record<string, unknown>): T | undefined

  /**
   * Returns the name associated with a JSXAttribute. For example, given `<div foo="bar" />` and the JSXAttribute for `foo`, this will return the string `"foo"`.
   */
  export function propName(prop: JSX_NODE_ELEMENTS): string

  /**
   * @deprecated This is not useable for the React Native, Please do not use this!
   */
  export const eventHandlers: never

  /**
   * @deprecated This is not useable for the React Native, Please do not use this!
   */
  export const eventHandlersByType: never
}
