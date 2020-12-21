import { JSXElement, JSXOpeningElement } from '../types'

/**
 * Original: see https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/src/util/findChild.js
 */
export const findChild = (
  node: JSXElement,
  callback: (child: JSXOpeningElement) => boolean,
): JSXOpeningElement | null => {
  const { children } = node
  if (children && children.length > 0) {
    for (let i = 0; i < children.length; i += 1) {
      // TODO: FIX
      const child = (children[i] as unknown) as JSXElement
      if (child.openingElement && child.openingElement.name) {
        if (callback(child.openingElement)) {
          return child.openingElement
        }
      }
      const foundChild = findChild(child, callback)
      if (foundChild) {
        return foundChild
      }
    }
  }
  return null
}
