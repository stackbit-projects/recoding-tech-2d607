import { createTheme } from "@material-ui/core/styles";

const serifFont = "'Libre Baskerville', serif";
const sansSerifFont = "'Lexend', sans-serif";

const theme = createTheme({
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
      fontFamily: sansSerifFont
    },
    link: {
      color: "#FF0033"
    }
  }
});

export default theme;
