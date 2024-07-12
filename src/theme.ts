import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    secondary: {
      main: "#133A6F",
      contrastText: "#E0E6EC",
    },
  },
  typography: {
    fontFamily: "Nunito",
  },
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: "12px",
          padding: 0,
        },
        content: {
          margin: 0,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          boxShadow: "none",
          ":last-of-type": {
            border: 0,
          },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        line: {
          minHeight: "14px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
  },
});
