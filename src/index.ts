import {
  hasAccessibilityHint,
  hasValidAccessibilityActions,
  noDeprecatedProps,
} from './rules/basic'
import {
  accessibleImageHasLabel,
  imageHasAccessible,
  noAccessibilityLabelForTesting,
} from './rules/ios'

const PLUGIN_NAME = 'rn-a11y'

const defaultConfig = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [PLUGIN_NAME],
}

const basicRules = {
  [`${PLUGIN_NAME}/has-accessibility-hint`]: 'error',
  [`${PLUGIN_NAME}/has-valid-accessibility-actions`]: 'error',
  [`${PLUGIN_NAME}/no-deprecated-props`]: 'error',
}

const androidRules = {}

const iOSRules = {
  [`${PLUGIN_NAME}/accessible-image-has-label`]: 'error',
  [`${PLUGIN_NAME}/no-accessibilityLabel-for-testing`]: 'error',
}

const experimentalRules = {
  [`${PLUGIN_NAME}/image-has-accessible`]: 'error',
}

export const rules = {
  'has-accessibility-hint': hasAccessibilityHint,
  'has-valid-accessibility-actions': hasValidAccessibilityActions,
  'no-deprecated-props': noDeprecatedProps,
  'accessible-image-has-label': accessibleImageHasLabel,
  'no-accessibilityLabel-for-testing': noAccessibilityLabelForTesting,
  'image-has-accessible': imageHasAccessible,
}

module.exports = {
  rules,
  configs: {
    basic: {
      ...defaultConfig,
      rules: basicRules,
    },
    androidRules: {
      ...defaultConfig,
      rules: androidRules,
    },
    iOS: {
      ...defaultConfig,
      rules: iOSRules,
    },
    all: {
      ...defaultConfig,
      rules: { ...basicRules, ...androidRules, ...iOSRules },
    },
    experimental: {
      ...defaultConfig,
      rules: experimentalRules,
    },
  },
}
