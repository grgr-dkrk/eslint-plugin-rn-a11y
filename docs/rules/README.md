## Supported Rules

### Basic

- has-accessibility-hint: ported from [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y).
- has-valid-accessibility-actions: ported from [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y).
- no-nested-touchables: ported from [eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y).
- [no-deprecated-props](./basic/no-deprecated-props.md): Disallow using deprecated props. (ex: `accessibilityComponentType` and `accessibilityTraits`.)
- [no-accessibilityLabel-for-testing](./docs/ios/no-accessibilityLabel-for-testing.md): Disallow set both `accessibilityLabel` and `testID` without `accessible`.

### Android

TBD

### iOS

- [accessible-image-has-label](./docs/ios/accessible-image-has-label.md): Enforce `Image` have `accessibilityLabel` prop if it has `accessible` prop.
- [adjustable-slider-has-role](./docs/ios/adjustable-slider-has-role.md): Enforce adjustable slider has `adjustable` role for iOS.

### WCAG

- [touchable-has-alt](./docs/wcag/touchable-has-alt.md): Enforce `Touchable` components have both `accessible` and `accessibilityLabel` prop any children or self.

### Experimental

These rules are experimental and unstable.  
Only available with `plugin:rn-a11y/experimental`.

- [image-has-accessible](./docs/ios/image-has-accessible.md): Enforce `<Image />` have both `accessible` and `accessibilityLabel` props.
- [has-enough-button-size](./docs/android/has-enough-button-size.md): Enforces `Touchable` components have enough size.
