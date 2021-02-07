# Disallow using `inverted` props on VirtualizedList

`rn-a11y/no-use-inverted-virtualizedList`

The screen reader does not read in the correct order because `<FlatList inverted>` (and `<SectionList inverted>`) only inverts the visual order.
It is recommended to invert the target list.

**⚠️ NOTE:** This is a bug due to the implementation of `VirtualizedList`. This rule has been deprecated since the modified version.

## Type

Warning

## Examples

### Not Good

```tsx
export const MaybeAccessibleComponent = () => {
  const data = [
    { id: '1', val: 'foo' },
    { id: '2', val: 'bar' },
    { id: '3', val: 'baz' },
  ]
  return (
    <FlatList
      data={data}
      renderItem={(item) => (
        <View>
          <Text>{item.val}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
      inverted
    />
  )
}
```

### Good

```tsx
export const MaybeAccessibleComponent = (props) => {
  /**
   * It is recommended to process the data once.
   * This is just an example.
   */
  const data = [
    { id: '1', val: 'foo' },
    { id: '2', val: 'bar' },
    { id: '3', val: 'baz' },
  ].reverse()
  return (
    <FlatList
      data={data}
      renderItem={(item) => (
        <View>
          <Text>{item.val}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
      inverted
    />
  )
}
```

```

```
