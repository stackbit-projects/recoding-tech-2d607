import { createTheme } from "@mui/material/styles";

const serifFont = "'Libre Baskerville', serif";
const sansSerifFont = "'Lexend', sans-serif";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: sansSerifFont,
          fontWeight: "bold",
          textAlign: "center"
        }
      }
    }
  },
  palette: {
    primary: {
      main: "#C2CECC"
    },
    issue: {
      main: "#FAD3CD"
    },
    policy: {
      main: "#84A4CC"
    },
    country: {
      main: "#8AA29D"
    },
    company: {
      main: "#CCC"
    }
  },
  typography: {
    fontFamily: serifFont,
    h1: {
      fontFamily: sansSerifFont,
      fontSize: "2.1em",
      fontWeight: "bold",
      textAlign: "center"
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
