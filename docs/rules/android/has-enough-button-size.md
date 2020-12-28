# Enforces `Touchable` components have enough size

**⚠️ NOTE:** This rule is **experimental**. It is not accurate and does not support inline-style, and the `Stylesheet` must appear after the component declaration.

`Touchable` and `Plessable` should have at least a dimension of `48dp x 48dp` to be touchable.  
see: https://developer.android.com/guide/topics/ui/accessibility/apps#large-controls

## Examples

### Not Good

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <TouchableOpacity style={styles.wrapper}>
      <Text>Press Me</Text>
    </TouchableOpacity>
  )
}

const styles = Stylesheet.create({
  wrapper: {
    width: 80, // fail
    height: 80, // fail
  },
})
```

```tsx
type Props = {
  isActive?: boolean
}

export const MaybeAccessibleComponent = (props: Props) => {
  return (
    <TouchableOpacity
      style={[styles.wrapper, props.isActive && styles.isActive]}
    >
      <Text>Press Me</Text>
    </TouchableOpacity>
  )
}

const styles = Stylesheet.create({
  wrapper: {},
  isActive: {
    width: 80, // fail
    height: 80, // fail
  },
})
```

### Good

```tsx
export const MaybeAccessibleComponent = () => {
  return (
    <TouchableOpacity style={styles.wrapper}>
      <Text>Press Me</Text>
    </TouchableOpacity>
  )
}

const styles = Stylesheet.create({
  wrapper: {
    width: 180, // ok
    height: 180, // ok
  },
})
```
