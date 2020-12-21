# eslint-plugin-rn-a11y

![Check](https://github.com/grgr-dkrk/eslint-plugin-rn-a11y/workflows/Check/badge.svg?branch=main) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is Experimental.  
Some rules have been ported from [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y).

## Install

TBD

## Configuration

- `plugin:rn-a11y/basic`: Common basic rules of iOS and Android.
- `plugin:rn-a11y/iOS`: iOS-specific rules, includes `basic`.
- `plugin:rn-a11y/android`: Android-specific rules, includes `basic`.
- `plugin:rn-a11y/all`: all rules.

For example:

```javascript
module.exports = {
  /* ... */
  extends: ['plugin:rn-a11y/all'],
  /* ... */
}
```

## Supported Rules

### Basic

- has-accessibility-hint: ported from [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y).
- has-valid-accessibility-actions: ported from [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y).
- [no-deprecated-props](): Disallow using deprecated props. (ex: `accessibilityComponentType` and `accessibilityTraits`.)
- [no-accessibilityLabel-for-testing](): Disallow set `AccessibilityLabel` and `testID` both without `Accessible`.
- [no-nested-touchables](): ported from [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y).

### Android

TBD

### iOS

- [accessible-image-has-label](): Enforce `Image` must have `accessibilityLabel` prop if it has `accessible` prop.

### WCAG

TBD

### Experimental

`plugin:rn-a11y/experimental` only.

- [image-has-accessible](): `<Image />` should has `accessible` and `accessibilityLabel` props. (iOS)

## Support

Supported React Native 0.57, or above.

On < 0.57, please use [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y)  
On React (not React Native), please use [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

## Set Custom Component Name

If you want to include custom components in rules, set the `customComponents` property to `rules` in `.eslintrc.js` as shown below.

```javascript
// eslintrc.js
rules: {
  'rn-a11y/no-nested-touchables': [
    'error',
    {
      customComponents: ['TouchableCustom'],
    },
  ],
},
```

Custom component settings are for each rule. It cannot be set in common with other rules.

## Contribution

Contribution is welcome!  
Please see [Contribution Guide](CONTRIBUTING.md).

## License

MIT
