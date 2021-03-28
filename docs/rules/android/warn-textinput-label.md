# Warn `TextInput` problem that it may not read `accessibilityLabel` or `accessibilityHint`.

`rn-a11y/warn-textinput-label`  
Preset: Android

On Android, `<TextInput />` does not read `accessibilityLabel` and `accessibilityHint` if there is set a value.  
The solution to this problem is not officially supported now.

## Type

Warning

## Examples

### Warning

```tsx
type Props = {
  val: string
}

export const MaybeAccessibleComponent = (props: Props) => {
  // `accessibilityLabel` and `accessibilityHint` are not read on TalkBack.
  return (
    <TextInput
      defaultValue={val}
      accessibilityLabel="My Input"
      accessibilityHint="Please Input"
    />
  )
}
```
