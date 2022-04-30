import { createTheme } from "@mui/material/styles";

const serifFont = "'Libre Baskerville', serif";
const sansSerifFont = "'Lexend', sans-serif";

const defaultTheme = createTheme({});
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
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: sansSerifFont,
          fontWeight: "bold",
          textTransform: "uppercase",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#000",
          fontFamily: sansSerifFont,
          fontWeight: "bold",
          textAlign: "center",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: sansSerifFont,
          textTransform: "uppercase",
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        displayedRows: {
          fontFamily: sansSerifFont,
        },
        select: {
          fontFamily: sansSerifFont,
        },
        selectLabel: {
          fontFamily: sansSerifFont,
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#FF0033",
    },
    secondary: {
      main: "#C2CECC",
    },
    issue: defaultTheme.palette.augmentColor({
      name: "issue",
      color: {
        main: "#FAD3CD",
        dark: "#C7A09A",
      },
    }),
    policy: defaultTheme.palette.augmentColor({
      name: "policy",
      color: {
        main: "#84A4CC",
        dark: "#517199",
      },
    }),
    country: defaultTheme.palette.augmentColor({
      name: "country",
      color: {
        main: "#8AA29D",
        dark: "#3E5651",
      },
    }),
    company: defaultTheme.palette.augmentColor({
      name: "company",
      color: {
        main: "#CCCCCC",
        dark: "#666666",
      },
    }),
    footer: defaultTheme.palette.augmentColor({
      name: "footer",
      color: {
        main: "#EFE9DA",
        dark: "#BCB6A7",
      },
    }),
  },
  typography: {
    fontFamily: serifFont,
    h1: {
      fontFamily: sansSerifFont,
      fontSize: "2.4em",
      fontWeight: "bold",
      textAlign: "center",
    },
    h2: {
      fontFamily: sansSerifFont,
      fontSize: "1.9em",
      fontWeight: "bold",
      marginBottom: 40,
    },
    h2_article: {
      fontFamily: sansSerifFont,
      fontSize: "2em",
      fontWeight: "500",
      marginBottom: 40,
    },
    h3: {
      fontFamily: sansSerifFont,
      fontSize: "1.4em",
      fontWeight: "bold",
      marginBottom: 20,
      textTransform: "uppercase",
    },
    h3_subheading: {
      fontFamily: sansSerifFont,
      fontSize: "1.4em",
      fontWeight: "bold",
      marginBottom: 20,
    },
    h4: {
      fontFamily: sansSerifFont,
      fontSize: "1.1em",
      fontWeight: "bold",
      marginBottom: 20,
      textTransform: "uppercase",
    },
    h5: {
      fontFamily: sansSerifFont,
      fontSize: "0.8em",
      marginBottom: 20,
      textTransform: "uppercase",
    },
    subtitle1: {
      fontFamily: sansSerifFont,
      fontSize: "1.0em",
      fontWeight: "200",
      textTransform: "uppercase",
    },
    supertitle: {
      fontFamily: sansSerifFont,
      fontSize: "1.2em",
      fontWeight: "500",
      marginBottom: 20,
      textTransform: "uppercase",
    },
    link: {
      color: "#FF0033",
      fontFamily: sansSerifFont,
    },
    overline: {
      fontFamily: sansSerifFont,
      fontSize: "1.2em",
      fontWeight: "bold",
      textTransform: "none",
    },
  },
});

export default theme;
