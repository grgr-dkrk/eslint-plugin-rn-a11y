import { JSXElement, JSXOpeningElement } from '../../types'

/**
 * Original: see https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/src/util/findChild.js
 */
export const findChild = (
  node: JSXElement,
  callback: (child: JSXOpeningElement) => boolean,
  // The recursive option is a change from the original.
  isRecursive = true,
): JSXElement | undefined => {
  const { children } = node
  if (children && children.length > 0) {
    return children.find((child) => {
      if (child.openingElement && child.openingElement.name) {
        if (callback(child.openingElement)) {
          return child.openingElement
        }
      }
      if (isRecursive) {
        const foundChild = findChild(child, callback)
        if (foundChild) {
          return foundChild
        }
      }
    })
  }
  return
}
