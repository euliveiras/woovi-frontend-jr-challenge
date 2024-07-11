import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
  },
});
