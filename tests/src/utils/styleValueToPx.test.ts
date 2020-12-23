import { styleValueToPx } from '../../../src/utils'

describe('styleValueToPx', () => {
  it.each([
    [300, 300],
    [300.2, 300.2],
    ['300', 300],
    ['300px', 300],
    ['300.2px', 300.2],
  ])('%f: return %f', (val, expected) => {
    expect(styleValueToPx(val)).toBe(expected)
  })
  it.each(['100%', 'auto'])('%i: return undefined', (val) => {
    expect(styleValueToPx(val)).toBe(undefined)
  })
})
