const defaultConfig = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-native-a11y'],
}

export const configs = {
  recommended: {
    env: {
      es6: true,
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: [],
    rules: {},
  },
}
