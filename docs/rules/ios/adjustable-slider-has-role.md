# Enforce adjustable slider has `adjustable` role for iOS.

`rn-a11y/adjustable-slider-has-role`

The `accessibilityRole="adjustable"` role is required for iOS to recognize components that can be increased or decreased.

## Type

Error

## Examples

### Not Good

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <View
      accessible
      accessibilityActions={[
        { name: 'increment', label: 'increment' },
        { name: 'decrement', label: 'decrement' },
      ]}
    />
  )
}
```

### Good

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <View
      accessible
      accessibilityRole="adjustable" // good
      accessibilityActions={[
        { name: 'increment', label: 'increment' },
        { name: 'decrement', label: 'decrement' },
      ]}
    />
  )
}
```
