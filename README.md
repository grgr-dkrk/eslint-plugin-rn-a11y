# eslint-plugin-rn-a11y

![Check](https://github.com/grgr-dkrk/eslint-plugin-rn-a11y/workflows/Check/badge.svg?branch=main) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**⚠️ This project is under development, and not published yet.**

`eslint-plugin-rn-a11y` is ESLint plugin for Accessibility in React Native.  
This is ported(some rules, utils) and extended [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y).

## Install

```sh
yarn add -D eslint eslint-plugin-rn-a11y
```

## Configuration

This plugin has several presets.  
They can be set to the `extends` property of `eslintrc`.

- `plugin:rn-a11y/basic`: Common basic rules of iOS and Android.
- `plugin:rn-a11y/iOS`: iOS-specific rules, includes `basic`.
- `plugin:rn-a11y/android`: Android-specific rules, includes `basic`.
- `plugin:rn-a11y/wcag`: WCAG2.x rules, includes `basic`.
- `plugin:rn-a11y/all`: Includes `basic`, `iOS`, `wcag`, and `android`.

For example:

```javascript
// eslintrc.js

module.exports = {
  /* ... */
  extends: ['plugin:rn-a11y/basic'],
  /* ... */
}
```

### Supported Rules

See: [Rules](./docs/rules/README.md).

### Set Custom Component Name

If you want to include custom components in rules, set the component name to `rules` in `.eslintrc.js` as shown below.  
(When using `Button`, `TouchableXXX`, and `Pressable`, specify those as the `Touchable` property.)

```javascript
// eslintrc.js

const Image = ['MyPict']
const Touchable = ['MyButton', 'MyTouchable']

const CustomComponents = {
  Image,
  Touchable,
}

rules: {
  'rn-a11y/no-nested-touchables': [
    'error',
    CustomComponents,
  ],
  'rn-a11y/touchable-has-alt': [
    'error',
    CustomComponents,
  ],
},
```

Custom component settings are for each rule. It cannot be set in common with other rules.

## Support

- Node: `^10.12.0` or above.
- React Native: `0.57` or above.
- ESLint: `6` or above.

This plugin is not compatible with less than `React Native 0.57`. please use [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y) if using it.  
React (not React Native) is not supported, please use [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

## Contribution

Contribution is welcome!

Please see [Contribution Guide](CONTRIBUTING.md).

## License

[MIT](LICENSE.md)
