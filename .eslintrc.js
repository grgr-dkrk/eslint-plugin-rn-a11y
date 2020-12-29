const Image = ['MyPict']
const Touchable = ['MyButton', 'MyTouchable']

const CustomComponents = {
  Image,
  Touchable,
}

module.exports = {
  /* ... */
  rules: {
    'rn-a11y/no-nested-touchables': ['error', CustomComponents],
    'rn-a11y/touchable-has-alt': ['error', CustomComponents],
  },
}
