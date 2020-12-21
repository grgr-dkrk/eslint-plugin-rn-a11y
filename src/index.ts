import {
  hasAccessibilityHint,
  hasValidAccessibilityActions,
  noDeprecatedProps,
} from './rules/basic'

const PLUGIN_NAME = 'rn-a11y'

const basicRules = {
  [`${PLUGIN_NAME}/has-accessibility-hint`]: 'error',
  [`${PLUGIN_NAME}/has-valid-accessibility-actions`]: 'error',
  [`${PLUGIN_NAME}/no-deprecated-props`]: 'error',
}

const iOSRules = {
  [`${PLUGIN_NAME}/has-accessibility-hint`]: 'error',
  [`${PLUGIN_NAME}/has-valid-accessibility-actions`]: 'error',
  [`${PLUGIN_NAME}/no-deprecated-props`]: 'error',
}

export const rules = {
  'has-accessibility-hint': hasAccessibilityHint,
  'has-valid-accessibility-actions': hasValidAccessibilityActions,
  'no-deprecated-props': noDeprecatedProps,
}

export const configs = {
  recommended: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: [PLUGIN_NAME],
    rules: {},
    configs: {
      basic: {
        rules: basicRules,
      },
    },
  },
}
