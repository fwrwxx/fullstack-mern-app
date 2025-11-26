export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#FAFAFA",
    50: "#F2F2F5",
    100: "#E5E5EA",
    200: "#D1D1D6",
    300: "#B7B7C0",
    400: "#8E8E97",
    500: "#6E6E77",
    600: "#4C4C54",
    700: "#2C2C34",
    800: "#1A1A22",
    900: "#0C0C12",
    1000: "#000000",
  },

  primary: {
    50: "#F4E6FF",
    100: "#E7C8FF",
    200: "#D395FF",
    300: "#BE5CFF",
    400: "#A830FF",
    500: "#9A00FF",
    600: "#7000BC",
    700: "#47007D",
    800: "#24003F",
    900: "#12001F",
  },

  accent: {
    50: "#E3FFFB",
    100: "#C1FFF6",
    200: "#8CFFF0",
    300: "#4FFFE8",
    400: "#16F2DB",
    500: "#00D9C5",
    600: "#00A897",
    700: "#006B63",
    800: "#003F3B",
    900: "#00201D",
  },
};

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: "#0C0C12",
              alt: "#1A1A22",
            },
          }
        : {
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: "#FAFAFA",
              alt: "#FFFFFF",
            },
          }),
    },

    typography: {
      fontFamily: ["Outfit", "Sora", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Outfit", "Sora", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Outfit", "Sora", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Outfit", "Sora", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Outfit", "Sora", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Outfit", "Sora", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Outfit", "Sora", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
