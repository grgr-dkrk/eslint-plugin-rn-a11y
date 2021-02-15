# Suggest the `Touchable` component itself or its children to be accessible.

`rn-a11y/touchable-has-alt`

Manipulable elements must include labels.

## Type

Warning

## Options

`checkRole: boolean`(optional): Also check the role of `Touchable`. default is `false`.

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

#### with `checkRole` option

```tsx
export const MaybeAccessibleComponent = (props: Props) => {
  return (
    <TouchableOpacity
      accessible
      accessibilityLabel="Go back"
      accessibilityHint="Navigates to the previous screen"
      // role is not found
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

#### with `checkRole` option

```tsx
export const MaybeAccessibleComponent = (props: Props) => {
  return (
    <TouchableOpacity
      accessible
      accessibilityLabel="Go back"
      accessibilityHint="Navigates to the previous screen"
      accessibilityRole="imagebutton" // must have the `imagebutton` role
      onPress={() => {
        props.handleGoBack
      }}
    >
      <Image source={require('arrow.png')} />
    </TouchableOpacity>
  )
}
```
