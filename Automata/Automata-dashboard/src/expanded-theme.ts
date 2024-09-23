
declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    [key: number]: string; // Define index signature for PaletteColor
  }

  interface Palette {
    tertiary: PaletteColor; // Define tertiary color palette
  }
}

