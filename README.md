# eslint-plugin-rn-a11y

![Check](https://github.com/grgr-dkrk/eslint-plugin-rn-a11y/workflows/Check/badge.svg?branch=main) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**⚠️ This project is under development, and not published yet.**

`eslint-plugin-rn-a11y` is ESLint plugin for Accessibility in React Native.  
This is ported(some rules, utils) and extended [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y).

## Install

TBD

## Configuration

This plugin has several presets.  
They can be set to the `extends` property of `eslintrc`.

- `plugin:rn-a11y/basic`: Common basic rules of iOS and Android.
- `plugin:rn-a11y/iOS`: iOS-specific rules, includes `basic`.
- `plugin:rn-a11y/android`: Android-specific rules, includes `basic`.
- `plugin:rn-a11y/wcag`: WCAG2.x rules, includes `basic`.
- `plugin:rn-a11y/all`: Includes `basic`, `iOS`, and `android`.

For example:

```javascript
// eslintrc.js

module.exports = {
  /* ... */
  extends: ['plugin:rn-a11y/basic'],
  /* ... */
}
```

## Supported Rules

### Basic

- has-accessibility-hint: ported from [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y).
- has-valid-accessibility-actions: ported from [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y).
- no-nested-touchables: ported from [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y).
- [no-deprecated-props](./docs/rules/basic/no-deprecated-props.md): Disallow using deprecated props. (ex: `accessibilityComponentType` and `accessibilityTraits`.)
- [no-accessibilityLabel-for-testing](./docs/rules/ios/no-accessibilityLabel-for-testing.md): Disallow set both `accessibilityLabel` and `testID` without `accessible`.

### Android

TBD

### iOS

- [accessible-image-has-label](./docs/rules/ios/accessible-image-has-label.md): Enforce `Image` have `accessibilityLabel` prop if it has `accessible` prop.

### WCAG

- [touchable-has-alt](./docs/rules/wcag/touchable-has-alt.md): Enforce `Touchable` components have both `accessible` and `accessibilityLabel` prop any children or self.

### Experimental

These rules are experimental and unstable.  
Only available with `plugin:rn-a11y/experimental`.

- [image-has-accessible](./docs/rules/ios/image-has-accessible.md): Enforce `<Image />` have both `accessible` and `accessibilityLabel` props.
- [has-enough-button-size](./docs/rules/android/has-enough-button-size.md): Enforces `Touchable` components have enough size.

## Support

Supported React Native 0.57, or above.

On < 0.57, please use [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y)  
On React (not React Native), please use [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

## Set Custom Component Name

If you want to include custom components in rules, set the `customComponents` property to `rules` in `.eslintrc.js` as shown below.

```javascript
// eslintrc.js

const CustomTouchables = ['MyButton', 'MyTouchable']

rules: {
  'rn-a11y/no-nested-touchables': [
    'error',
    {
      customComponents: CustomTouchables,
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
