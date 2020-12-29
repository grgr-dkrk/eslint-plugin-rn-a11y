import {
  CUSTOM_TOUCHABLE,
  IMAGE,
  TOUCHABLE_ELEMENTS,
} from '../../src/constants'
import { JSXOpeningElement } from '../../src/types'
import { isTargetElement } from '../../src/utils'

// TODO: fix type
const createJSXMock = (name: string): JSXOpeningElement => ({
  type: 'JSXOpeningElement',
  name: {
    type: 'JSXIdentifier',
    name,
  },
})

describe('getCustomNames', () => {
  // React Native Component
  it('should return true if Node contains component', () => {
    expect(
      isTargetElement(
        createJSXMock('TouchableOpacity'),
        [],
        TOUCHABLE_ELEMENTS,
        CUSTOM_TOUCHABLE,
      ),
    ).toBe(true)
  })
  it('should return false if Node not contains component', () => {
    expect(
      isTargetElement(
        createJSXMock('View'),
        [],
        TOUCHABLE_ELEMENTS,
        CUSTOM_TOUCHABLE,
      ),
    ).toBe(false)
  })

  // Custom Component
  it('should return true if Node contains custom component', () => {
    expect(
      isTargetElement(
        createJSXMock('MyCustomImage'),
        [
          {
            Image: ['MyCustomImage'],
          },
        ],
        [IMAGE],
        IMAGE,
      ),
    ).toBe(true)
  })
  it('should return true if Node contains custom components', () => {
    expect(
      isTargetElement(
        createJSXMock('MaybeAccessibleImage'),
        [
          {
            Image: ['MyCustomImage', 'MaybeAccessibleImage'],
          },
        ],
        [IMAGE],
        IMAGE,
      ),
    ).toBe(true)
  })
  it('should return false if Node contains custom component', () => {
    expect(
      isTargetElement(
        createJSXMock('MaybeAccessibleImage'),
        [
          {
            Image: ['MyCustomImage'],
          },
        ],
        [IMAGE],
        IMAGE,
      ),
    ).toBe(false)
  })
  it('should return false if Node not contains custom component even though has other props', () => {
    expect(
      isTargetElement(
        createJSXMock('MaybeAccessibleComponent'),
        [
          {
            View: ['MaybeAccessibleComponent'],
            Image: ['MyCustomImage'],
          },
        ],
        [IMAGE],
        IMAGE,
      ),
    ).toBe(false)
  })
  it('should return false if Node contains custom component but wrong name (Touchable)', () => {
    expect(
      isTargetElement(
        createJSXMock('MyTouchableOpacity'),
        [
          {
            // Touchable is correct
            TouchableOpacity: ['MyTouchableOpacity'],
          },
        ],
        TOUCHABLE_ELEMENTS,
        CUSTOM_TOUCHABLE,
      ),
    ).toBe(false)
  })
})
