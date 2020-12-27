import { RuleTester } from 'eslint'
import { hasValidAccessibilityActions } from '../../..'
import { createTesterOptions } from '../../createTesterOptions'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester(createTesterOptions())

ruleTester.run(
  'has-valid-accessibility-actions',
  hasValidAccessibilityActions,
  {
    valid: [
      {
        code: `<View
              accessibilityActions={[
                {name: 'cut', label: 'cut'},
                {name: 'copy', label: 'copy'},
                {name: 'paste', label: 'paste'},
              ]}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                  case 'copy':
                    Alert.alert('Alert', 'copy action success');
                    break;
                  case 'paste':
                    Alert.alert('Alert', 'paste action success');
                    break;
                }
              }}
            />`,
      },
      {
        code: `<View
              accessibilityActions={[
                {name: 'magicTap'},
              ]}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'magicTap':
                    Alert.alert('Alert', 'magicTap action success');
                    break;
                }
              }}
            />`,
      },
      {
        code: `<View
              accessibilityActions={useMemo()}
              onAccessibilityAction={useCallback()}
            />`,
      },
    ],
    invalid: [
      {
        code: `<View
              accessibilityActions={[
                {name: 'cut', label: 'cut'},
              ]}
            />`,
        errors: [
          {
            message:
              'accessibilityActions: has accessibilityActions but onAccessibilityAction is not a function',
            type: 'JSXOpeningElement',
          },
        ],
      },
      {
        code: `<View
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                }
              }}
            />`,
        errors: [
          {
            message:
              'accessibilityActions: has onAccessibilityAction function but no accessibilityActions Array',
            type: 'JSXOpeningElement',
          },
        ],
      },
      {
        code: `<View
              accessibilityActions={{
                name: 'cut',
                label: 'cut',
              }}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                }
              }}
            />`,
        errors: [
          {
            message: 'accessibilityActions: value must be an Array',
            type: 'JSXOpeningElement',
          },
        ],
      },
      {
        code: `<View
              accessibilityActions={[]}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                }
              }}
            />`,
        errors: [
          {
            message: 'accessibilityActions: Array cannot be empty',
            type: 'JSXOpeningElement',
          },
        ],
      },
      {
        code: `<View
              accessibilityActions={[
                {name: 'cut'},
              ]}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                }
              }}
            />`,
        errors: [
          {
            message: 'accessibilityActions: custom action "cut" missing label',
            type: 'JSXOpeningElement',
          },
        ],
      },
      {
        code: `<View
              accessibilityActions={[
                {label: 'cut'},
              ]}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                }
              }}
            />`,
        errors: [
          {
            message: 'accessibilityActions: action missing name',
            type: 'JSXOpeningElement',
          },
        ],
      },
      {
        code: `<View
              accessibilityActions={[
                {name: 'cut', label: 'cut', foo: 'bar'},
              ]}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                }
              }}
            />`,
        errors: [
          {
            message:
              'accessibilityActions: action "cut" contains unrecognised keys',
            type: 'JSXOpeningElement',
          },
        ],
      },
    ],
  },
)
