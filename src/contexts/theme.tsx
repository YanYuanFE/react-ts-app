import { useImmer } from "use-immer";
import { createContainer } from "unstated-next";

interface ThemeState {
  theme: any;
}

const defaultTheme: ThemeState = {
  theme: {},
};
export const useTheme = (initialState = defaultTheme) => {
  const [theme, setTheme] = useImmer(initialState);

  const updateTheme = (theme: Partial<ThemeState>) => {
    setTheme((draft) => {
      draft.theme = theme;
    });
  };

  return { theme, updateTheme };
};

const Theme = createContainer(useTheme);

export const ThemeProvider = Theme.Provider;

export const useThemeContainer = () => Theme.useContainer();
