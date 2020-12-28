import {
  accessibleImageHasLabel,
  noAccessibilityLabelForTesting,
  imageHasAccessible,
  touchableHasAlt,
  hasEnoughButtonSize,
  hasAccessibilityHint,
  hasValidAccessibilityActions,
  noDeprecatedProps,
  noNestedTouchables,
} from './rules'

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
  [`${PLUGIN_NAME}/no-accessibilityLabel-for-testing`]: 'error',
  [`${PLUGIN_NAME}/no-nested-touchables`]: 'error',
}

const androidRules = {}

const iOSRules = {
  [`${PLUGIN_NAME}/accessible-image-has-label`]: 'error',
}

const wcagRules = {
  [`${PLUGIN_NAME}/touchable-has-alt`]: 'error',
}

const experimentalRules = {
  [`${PLUGIN_NAME}/image-has-accessible`]: 'error',
  [`${PLUGIN_NAME}/has-enough-button-size`]: 'error',
}

export const rules = {
  'has-accessibility-hint': hasAccessibilityHint,
  'has-valid-accessibility-actions': hasValidAccessibilityActions,
  'no-deprecated-props': noDeprecatedProps,
  'accessible-image-has-label': accessibleImageHasLabel,
  'no-accessibilityLabel-for-testing': noAccessibilityLabelForTesting,
  'image-has-accessible': imageHasAccessible,
  'no-nested-touchables': noNestedTouchables,
  'touchable-has-alt': touchableHasAlt,
  'has-enough-button-size': hasEnoughButtonSize,
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
      rules: { ...basicRules, ...androidRules },
    },
    iOS: {
      ...defaultConfig,
      rules: { ...basicRules, ...iOSRules },
    },
    wcag: {
      ...defaultConfig,
      rules: { ...basicRules, ...wcagRules },
    },
    all: {
      ...defaultConfig,
      rules: { ...basicRules, ...androidRules, ...iOSRules, ...wcagRules },
    },
    experimental: {
      ...defaultConfig,
      rules: experimentalRules,
    },
  },
}
