# Disallow set both `accessibilityLabel` and `testID` without `accessible`

`rn-a11y/no-accessibilityLabel-for-testing`

Do not use `accessibilityLabel` prop for e2e testing.  
This prop is also used for reading and can confuse screen reader users.

In the future, `testID` may also be supported on Android.  
See: https://github.com/facebook/react-native/pull/29610

## Type

Error

## Examples

### Not Good

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <ScrollView
      // accessibilityLabel and testID is same.
      accessibilityLabel="maybeAccessibleLabel"
      testID="maybeAccessibleLabel"
    >
      <Text>Text</Text>
    </ScrollView>
  )
}
```

### Good

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <ScrollView testID="maybeAccessibleLabel">
      <Text>Text</Text>
    </ScrollView>
  )
}
```

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <TouchableOpacity
      accessible
      accessibilityRole="button"
      accessibilityLabel="Text"
      testID="maybeAccessibleLabel"
    >
      <Text>Text</Text>
    </TouchableOpacity>
  )
}
```

#### Appium

please refer to this solution.  
See: https://codecept.io/mobile-react-native-locators.html

#### Detox

TBD
