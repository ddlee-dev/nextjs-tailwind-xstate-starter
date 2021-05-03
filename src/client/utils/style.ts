export type ThemeType = 'light' | 'dark';

// Local Storage key name for storing the user's theme preference
const themeKeyForLocalStorage = 'theme_preference';

// Returns the user's system theme preference
const systemTheme = (): ThemeType => {
  if (typeof window !== 'undefined') {
    const darkValue = '(prefers-color-scheme: dark)';
    const isDark = window.matchMedia(darkValue).matches;
    return isDark ? 'dark' : 'light';
  }
  return 'light';
};

// Return the user's theme preference
export const userTheme = (): string => {
  const localStorageThemePreference = window.localStorage.getItem(themeKeyForLocalStorage) as ThemeType;
  const systemThemePreference = systemTheme();
  return localStorageThemePreference || systemThemePreference;
};

/**
   * Since Xstate is responsible for managing our theme state,
   * the setThemeForTailWind function will ensure the correct
   * class gets added to the html tag.
   * https://tailwindcss.com/docs/dark-mode
   */
const setThemeForTailWind = (theme: ThemeType) => {
  const htmlTag = document.getElementsByTagName('html')[0];
  if (theme === 'dark') {
    htmlTag?.setAttribute('class', 'dark');
  } else {
    htmlTag?.setAttribute('class', '');
  }
};

// Updates the local storage key with the user's new theme preference
export const setThemeToLocalStorage = (theme: ThemeType): undefined => {
  setThemeForTailWind(theme);
  window.localStorage.setItem(themeKeyForLocalStorage, theme);
  return;
};
