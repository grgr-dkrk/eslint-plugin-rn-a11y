# Disallow using deprecated props

`accessibilityComponentType` and `accessibilityTraits` prop have been deprecated since 0.57. These props no longer work. Therefore, use `accessibilityRole` and `accessibilityState`.  
see: https://reactnative.dev/docs/accessibility#accessibilityrole  
see: https://reactnative.dev/docs/accessibility#accessibilitystate

This rule will also be deprecated, as the `@types/react-native` will also be modified.

## Examples

### Fail

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <TouchableOpacity
      accessibilityComponentType={'button'}
      accessibilityTraits={'button'}
    >
      Tap Me
    </TouchableOpacity>
  )
}
```

### Succeed

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <TouchableOpacity accessibilityRole={'button'}>Tap Me</TouchableOpacity>
  )
}
```
