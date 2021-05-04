import { createMachine } from 'xstate';
import { setThemeToLocalStorage } from '@/utils/style';

type ThemeContext = Record<string, unknown>;

export const themeMachine = createMachine<ThemeContext>(
  {
    id: 'theme_preference',
    initial: 'light',
    states: {
      dark: {
        on: {
          TOGGLE_THEME: {
            target: 'light',
            actions: ['toggleLight']
          }
        }
      },
      light: {
        on: {
          TOGGLE_THEME: {
            target: 'dark',
            actions: ['toggleDark']
          }
        }
      }
    }
  },
  {
    actions: {
      toggleLight: (context, event) => {
        setThemeToLocalStorage('light');
      },
      toggleDark: (context, event) => {
        setThemeToLocalStorage('dark');
      }
    }
  }
);
