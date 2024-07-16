import { createTheme } from "@mui/material";
import '@mui/material/styles';

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      color: { green: string; gray: string };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom: {
      color: { green?: string; gray?: string };
    };
  }
}

export const theme = createTheme({
  custom: { color: { gray: "#4D4D4D" } },
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
