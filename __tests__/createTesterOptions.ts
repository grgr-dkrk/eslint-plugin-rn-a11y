export const createTesterOptions = () => ({
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: require.resolve('@typescript-eslint/parser'),
})
