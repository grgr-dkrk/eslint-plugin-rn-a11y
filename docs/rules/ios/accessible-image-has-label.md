# Suggest `Image` should have `accessibilityLabel` prop if it has `accessible` prop.

`rn-a11y/accessible-image-has-label`

If `Image` is accessible, it is recommended that `accessibilityLabel` be set.

## Type

Warning

## Examples

### Not Good

```tsx
export const MaybeAccessibleComponent = () => {
  return <Image accessible source={require('foo.jpg')} />
}
```

### Good

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <Image
      accessible
      accessibilityLabel="Image of Foo."
      source={require('foo.jpg')}
    />
  )
}
```
