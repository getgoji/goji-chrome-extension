import type { ThemeOptions } from "@mui/material/styles"

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string
    }
  }

  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#5CA652",
      contrastText: "#000000"
    },
    secondary: {
      main: "#79B77F",
      contrastText: "#000000"
    },
    background: {
      default: "#FFC4BC",
      paper: "#fae6e7"
    },
    text: {
      primary: "#000000",
      secondary: "rgba(0,0,0,0.8)",
      disabled: "rgba(0,0,0,0.4)"
    },
    error: {
      main: "#C2BC13"
    },
    warning: {
      main: "#B22222"
    }
  }
}
