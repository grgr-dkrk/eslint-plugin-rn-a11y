# Suggest not to add accessible attributes inside the text component.

`rn-a11y/no-role-inside-text`

Text components are accessible by default. The child elements of the accessible element are grouped and the role is ignored.

## Type

Warning

## Examples

### Not Good

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <View>
      {/* Not Good */}
      <Text>
        Test <Text accessibilityRole="link">Link is Here</Text>
      </Text>
    </View>
  )
}
```

### Good

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <View>
      {/* Good, These texts are sibling.  */}
      <>
        <Text>Test</Text>
        <Text accessibilityRole="link">Link is Here</Text>
      </>
      {/* Good, a Text inside Text has accessibilityRole but parent has not
      accessible. */}
      <Text accessible={false}>
        Test <Text accessibilityRole="link">Link is Here</Text>
      </Text>
    </View>
  )
}
```
