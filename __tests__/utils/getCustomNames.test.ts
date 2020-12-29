import { IMAGE, TEXT } from '../../src/constants'
import { getCustomNames } from '../../src/utils/getCustomNames'

describe('getCustomNames', () => {
  it('should return character strings of the specified prop name', () => {
    expect(
      getCustomNames(
        [
          {
            Image: ['MyCustomImage', 'MaybeAccessibleImage'],
            View: ['MyCustomView'],
          },
        ],
        IMAGE,
      ),
    ).toStrictEqual(['MyCustomImage', 'MaybeAccessibleImage'])
  })
  it('should return empty array if prop is not found', () => {
    expect(
      getCustomNames(
        [
          {
            Image: ['MyCustomImage', 'MaybeAccessibleImage'],
            View: ['MyCustomView'],
          },
        ],
        TEXT,
      ),
    ).toStrictEqual([])
  })
  it('should return empty array if no options', () => {
    expect(getCustomNames([], TEXT)).toStrictEqual([])
  })
})
