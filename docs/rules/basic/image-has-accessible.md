# Suggest `<Image />` have both `accessible` and `accessibilityLabel` props

`rn-a11y/image-has-accessible`

It is recommended to use `accessibilityLabel` because the image will be recognizable by assistive technologies.

**⚠️ NOTE:** This rule checks up to the parent of the target `Image`. It does not target ancestral elements to prevent nesting of elements with `accessible`.

## Type

Warning

## Options

`isSupportedIos: boolean` For iOS it is also desirable to have `accessible` as well, default is `true`.

## Examples

### Not Good

```tsx
export const MaybeAccessibleComponent = () => {
  return <Image accessible source={require('foo.jpg')} />
}
```

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <View>
      <Image source={require('foo.jpg')} />
    </View>
  )
}
```

```tsx
export const MaybeAccessibleComponent = () => {
  // both `accessible` and `accessibilityLabel`, but no text.
  return <Image accessible accessibilityLabel="" source={require('foo.jpg')} />
}
```

### Good

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <View accessible accessibilityLabel="Image of Foo.">
      <Image source={require('foo.jpg')} />
    </View>
  )
}
```

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

```tsx
// (if `supportedIos` is false)
export const MaybeAccessibleComponent = () => {
  return (
    <Image accessibilityLabel="Image of Foo." source={require('foo.jpg')} />
  )
}
```
