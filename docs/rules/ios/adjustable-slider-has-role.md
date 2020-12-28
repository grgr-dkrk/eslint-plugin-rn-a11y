# Enforce adjustable slider has `adjustable` role for iOS.

The `accessibilityRole="adjustable"` role is required for iOS to recognize components that can be increased or decreased.

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
