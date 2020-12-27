# Enforce the `Touchable` component itself or its children to be accessible.

TBD

## Examples

### Not Good

```tsx
export const MaybeAccessibleComponent = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.handleGoBack
      }}
    >
      <Image source={require('arrow.png')} />
    </TouchableOpacity>
  )
}
```

### Good

```tsx
export const MaybeAccessibleComponent = (props: Props) => {
  return (
    <TouchableOpacity
      accessible
      accessibilityLabel="Go back"
      accessibilityHint="Navigates to the previous screen"
      onPress={() => {
        props.handleGoBack
      }}
    >
      <Image source={require('arrow.png')} />
    </TouchableOpacity>
  )
}
```

```tsx
export const MaybeAccessibleComponent = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.handleGoBack
      }}
    >
      <Text>Go Back</Text>
    </TouchableOpacity>
  )
}
```
