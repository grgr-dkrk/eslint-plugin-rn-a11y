# Enforce `<Image />` have both `accessible` and `accessibilityLabel` props

`rn-a11y/image-has-accessible`

If `Image` is accessible, it is recommended that `accessibilityLabel` be set.

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
