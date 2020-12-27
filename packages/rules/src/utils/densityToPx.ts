import { AndroidScreenDensity } from '@eslint-plugin-rn-a11y/interfaces'

export const densityToPx = (density: AndroidScreenDensity): number => {
  switch (density) {
    case 'ldpi':
      return 32
    case 'mdpi':
      return 48
    case 'hdpi':
      return 72
    case 'xhdpi':
      return 96
    case 'xxxhdpi':
      return 192
    case 'xxhdpi':
    default:
      return 144
  }
}
