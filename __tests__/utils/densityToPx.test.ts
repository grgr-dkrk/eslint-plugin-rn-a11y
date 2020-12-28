import { AndroidScreenDensity } from '../../src/types'
import { densityToPx } from '../../src/utils'

describe('densityToPx', () => {
  it.each([
    ['ldpi', 32],
    ['mdpi', 48],
    ['hdpi', 72],
    ['xhdpi', 96],
    ['xxhdpi', 144],
    ['xxxhdpi', 192],
    ['', 144],
    ['foo', 144],
  ])('%s: return %i', (density, expected) =>
    expect(densityToPx(density as AndroidScreenDensity)).toBe(expected),
  )
})
