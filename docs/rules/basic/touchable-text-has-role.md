# Enforces the touchable Text to have a role added

`rn-a11y/touchable-text-has-role`

Touchable Text requires `accessibilityRole`.  
Text is focusable, but without Role it is indistinguishable from non-Touchable Text.

## Type

Error

## Examples

### Not Good

```tsx
export const MaybeAccessibleComponent = () => {
  const something = () => {}
  return (
    <View>
      <Text onPress={something}>Press Me</Text>
    </View>
  )
}
```

### Good

```tsx
export const MaybeAccessibleComponent = () => {
  const something = () => {}
  return (
    <View>
      <Text accessibilityRole="button" onPress={something}>
        Press Me
      </Text>
    </View>
  )
}
```
