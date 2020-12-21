# eslint-plugin-rn-native

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is Experimental.  
Some rules have been ported from [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y).

## Install

```
yarn add -D eslint-plugin-rn-a11y
```

## Configuration

### apply config

`.eslintrc.js` to below:

```javascript
module.exports = {
  /* ... */
  extends: ['plugin:rn-a11y/all'],
  /* ... */
}
```

## Supported Rules & Presets

### Basic

- has-accessibility-hint: ported from `eslint-plugin-react-native-a11y`.
- [has-valid-accessibility-actions](): ported from `eslint-plugin-react-native-a11y`.
- [no-deprecated-props](): Some props are deprecated, do not use those (ex: `accessibilityComponentType` and `accessibilityTraits`.)

### Android

TBD

### iOS

- [accessible-image-has-label](): `<Image />` should has `accessibilityLabel` if it has `accessible` prop.
- [no-accessibilityLabel-for-testing](): Do not use `AccessibilityLabel` prop for only testing.

### WCAG

TBD

### Strict(`experimentalStrict` only.)

- [image-has-accessible](): `<Image />` should has `accessible` and `accessibilityLabel` props.

## Support

Supported React Native 0.57, or above.

On < 0.57, please use [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y)  
On React (not React Native), please use [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

## Set Custom Component Name

TBD

## Contributing

Contribution is welcome!  
Please see [Contribution Guide](CONTRIBUTING.md).

## License

MIT
