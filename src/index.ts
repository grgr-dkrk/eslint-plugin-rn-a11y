import {
  accessibleImageHasLabel,
  noAccessibilityLabelForTesting,
  imageHasAccessible,
  touchableHasAlt,
  hasEnoughButtonSize,
  hasAccessibilityHint,
  hasValidAccessibilityActions,
  adjustableSliderHasRole,
  noDeprecatedProps,
  noNestedTouchables,
  noLongAlt,
  noSameLabelAndHint,
  noUseInvertedVirtualizedList,
  warnTextInputLabel,
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
  'adjustable-slider-has-role': adjustableSliderHasRole,
  'no-long-alt': noLongAlt,
  'no-same-label-and-hint': noSameLabelAndHint,
  'no-use-inverted-virtualizedList': noUseInvertedVirtualizedList,
  'warn-textinput-label': warnTextInputLabel,
}

const basicRules = {
  [`${PLUGIN_NAME}/has-valid-accessibility-actions`]: 'error',
  [`${PLUGIN_NAME}/no-deprecated-props`]: 'error',
  [`${PLUGIN_NAME}/no-accessibilityLabel-for-testing`]: 'warn',
  [`${PLUGIN_NAME}/no-nested-touchables`]: 'error',
  [`${PLUGIN_NAME}/no-long-alt`]: 'warn',
  [`${PLUGIN_NAME}/no-same-label-and-hint`]: 'error',
  [`${PLUGIN_NAME}/image-has-accessible`]: 'warn',
  [`${PLUGIN_NAME}/no-use-inverted-virtualizedList`]: 'warn',
}

const androidRules = {
  [`${PLUGIN_NAME}/warn-textinput-label`]: 'warn',
}

const iOSRules = {
  [`${PLUGIN_NAME}/accessible-image-has-label`]: 'error',
  [`${PLUGIN_NAME}/adjustable-slider-has-role`]: 'error',
}

const wcagRules = {
  [`${PLUGIN_NAME}/touchable-has-alt`]: 'error',
}

const experimentalRules = {
  [`${PLUGIN_NAME}/has-enough-button-size`]: 'warn',
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
    experimentalAll: {
      ...defaultConfig,
      rules: {
        ...basicRules,
        ...androidRules,
        ...iOSRules,
        ...wcagRules,
        ...experimentalRules,
      },
    },
  },
}
