import { Theme } from '@aws-amplify/ui-react';

export const darkFantasyTheme: Theme = {
  name: 'dark-fantasy-theme',
  tokens: {
    colors: {
      background: {
        primary: '#0f172a', // ash.900
        secondary: '#1e293b', // ash.800
        tertiary: '#1e293b',
      },
      border: {
        primary: '#475569', // ash.600
        secondary: '#334155', // ash.700
      },
      font: {
        interactive: '#ffd7a8', // ember.200
        primary: '#f1f5f9', // ash.100
        secondary: '#cbd5e1', // ash.300
        tertiary: '#94a3b8', // ash.400
      },
      brand: {
        primary: {
          10: '#fff7ed',
          20: '#ffedd5',
          40: '#ffd7a8',
          60: '#fb923c',
          80: '#ea580c',
          90: '#c2410c',
          100: '#7c2d12',
        },
      },
    },
    components: {
      tabs: {
        borderColor: '{colors.border.primary}',
        item: {
          borderColor: 'transparent',
          color: '{colors.font.secondary}',
          _focus: {
            color: '{colors.font.interactive}',
          },
          _hover: {
            color: '{colors.font.interactive}',
            borderColor: '{colors.brand.primary.60}',
          },
          _active: {
            color: '{colors.font.interactive}',
            borderColor: '{colors.brand.primary.60}',
          },
        },
      },
      button: {
        primary: {
          backgroundColor: '#c2410c', // ember default
          color: '#f1f5f9', // ash.100
          _hover: {
            backgroundColor: '#ea580c', // ember.600
          },
          _focus: {
            backgroundColor: '#ea580c', // ember.600
            borderColor: '#ffd7a8', // ember.200
          },
          _active: {
            backgroundColor: '#c2410c', // ember default
          },
          _disabled: {
            backgroundColor: '#475569', // ash.600
          },
        },
      },
      field: {
        label: {
          color: '{colors.font.secondary}',
        },
        control: {
          color: '{colors.font.primary}',
          backgroundColor: '{colors.background.primary}',
          borderColor: '{colors.border.primary}',
          _focus: {
            borderColor: '{colors.brand.primary.60}',
            backgroundColor: '{colors.background.secondary}',
          },
        },
      },
      fieldcontrol: {
        color: '{colors.font.primary}',
        backgroundColor: '{colors.background.primary}',
        borderColor: '{colors.border.primary}',
        _focus: {
          borderColor: '{colors.brand.primary.60}',
          backgroundColor: '{colors.background.secondary}',
        },
      },
    },
  },
};