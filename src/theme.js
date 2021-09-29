import { createTheme } from "@mui/material/styles";

const serifFont = "'Libre Baskerville', serif";
const sansSerifFont = "'Lexend', sans-serif";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          color: "#000",
          fontFamily: sansSerifFont,
          fontSize: "1.2em",
          fontWeight: "bold",
          textAlign: "center",
          textTransform: "none"
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#000",
          fontFamily: sansSerifFont,
          fontWeight: "bold",
          textAlign: "center"
        }
      }
    }
  },
  palette: {
    primary: {
      main: "#FF0033"
    },
    seconary: {
      main: "#C2CECC"
    },
    issue: {
      main: "#FAD3CD",
      dark: "#C7A09A"
    },
    policy: {
      main: "#84A4CC",
      dark: "#517199"
    },
    country: {
      main: "#8AA29D",
      dark: "#3E5651"
    },
    company: {
      main: "#CCCCCC",
      dark: "#666666"
    },
    footer: {
      main: "#EFE9DA",
      dark: "#BCB6A7"
    }
  },
  typography: {
    fontFamily: serifFont,
    h1: {
      fontFamily: sansSerifFont,
      fontSize: "2.4em",
      fontWeight: "bold",
      textAlign: "center"
    },
    h2: {
      fontFamily: sansSerifFont,
      fontSize: "1.9em",
      fontWeight: "bold",
      marginBottom: 40
    },
    h3: {
      fontFamily: sansSerifFont,
      fontSize: "1.4em",
      fontWeight: "bold",
      marginBottom: 20,
      textTransform: "uppercase"
    },
    h4: {
      fontFamily: sansSerifFont,
      fontSize: "1.1em",
      fontWeight: "bold",
      marginBottom: 20,
      textTransform: "uppercase"
    },
    h5: {
      fontFamily: sansSerifFont,
      fontSize: "0.8em",
      marginBottom: 20,
      textTransform: "uppercase"
    },
    link: {
      color: "#FF0033",
      fontFamily: sansSerifFont
    },
    overline: {
      fontFamily: sansSerifFont,
      fontSize: "1.2em",
      fontWeight: "bold",
      textTransform: "none"
    }
  }
});

export default theme;
