# Prohibit the same sentence for `accessibilityLabel` and `accessibilityHint`

`rn-a11y/no-same-label-and-hint`

Normally, `accessibilityHint` is read after `accessibilityLabel`.  
It is recommended not to specify the same description.

## Type

Error

## Examples

### Fail

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <TouchableOpacity
      accessible
      accessibilityLabel={'This is Button'}
      accessibilityHint={'This is Button'} // same as `accessibilityLabel`
    >
      Tap Me
    </TouchableOpacity>
  )
}
```

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <TouchableOpacity
      accessible
      accessibilityLabel={'Button'}
      accessibilityHint={'button'} // cases are different, but the sentences are the same
    >
      Tap Me
    </TouchableOpacity>
  )
}
```

```tsx
export const MaybeAccessibleComponent = () => {
  const Label = 'This is Button'
  return (
    <TouchableOpacity
      accessible
      accessibilityLabel={Label}
      accessibilityHint={Label} // same params
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
    <TouchableOpacity
      accessible
      accessibilityLabel={'This is Button'}
      accessibilityHint={
        'Nothing happens when you press it, but this is a button.'
      }
    >
      Tap Me
    </TouchableOpacity>
  )
}
```

```tsx
export const MaybeAccessibleComponent = () => {
  const LABEL = 'This is Button'
  const HINT = 'Nothing happens when you press it, but this is a button.'
  return (
    <TouchableOpacity
      accessible
      accessibilityLabel={'This is Button'}
      accessibilityHint={
        'Nothing happens when you press it, but this is a button.'
      }
    >
      Tap Me
    </TouchableOpacity>
  )
}
```
