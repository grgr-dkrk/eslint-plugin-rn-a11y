[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is Experimental.

## Install

TBD

## Configuration

TBD

## Supported Rules & Presets

### Basic

- [has-accessibility-hint]():
- [has-valid-accessibility-actions]():
- [no-deprecated-props](): Some props are deprecated, do not use those (ex: `accessibilityComponentType` and `accessibilityTraits`.)

### Android

TBD

### iOS

- [accessible-image-has-label](): `<Image />` should have `accessibilityLabel` if it have `accessible`.
- [no-accessibilityLabel-for-testing](): ``

### WCAG2.0 and 2.1

TBD

### Strict(`unstableStrict` only.)

- [image-has-accessible](): `<Image />` should have `accessible` and `accessibilityLabel` props.

## Support

Supported React Native 0.57, or above.

On < 0.57, please use [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y)
On React (not React Native), please use [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

## Set Custom Component Name

TBD

## Contributing

Contributing is Welcome!
Please see [Contribute Guide](CONTRIBUTING.md).

## License

MIT
