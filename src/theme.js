import { createTheme } from "@mui/material/styles";

const serifFont = "'Libre Baskerville', serif";
const sansSerifFont = "'Lexend', sans-serif";

const defaultTheme = createTheme({});
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#000",
          fontFamily: sansSerifFont,
          textAlign: "center",
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: sansSerifFont,
          fontWeight: "500",
          textTransform: "uppercase",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: sansSerifFont,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#000",
          fontFamily: sansSerifFont,
          fontWeight: 700,
          textAlign: "center",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          // borderCollapse: 'unset',
          // borderSpacing: "0 16px",
          tableLayout: "auto",
          width: "100%",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& tr": {
            "&:active, &:focus, &:hover": {
              backgroundColor: "#FFF",
            },
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #E3DCC1",
          "&:hover": {
            backgroundColor: "#F3F0E6 !important",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none",
          fontFamily: sansSerifFont,
          paddingBottom: 16,
          paddingLeft: 0,
          paddingRight: 16,
          paddingTop: 16,
          textTransform: "uppercase",
          // "&:hover": {
          //   "&:after": {
          //     backgroundColor: "#F3F0E6",
          //     content: "''",
          //     display: "block",
          //     height: "60%",
          //     left: 0,
          //     position: "absolute",
          //     top: "50%",
          //     transform: "translateY(-50%)",
          //     width: "100%",
          //     zIndex: "-1",
          //   },
          // }
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
      main: "#000",
    },
    secondary: {
      main: "#427569",
    },
    tertiary: {
      main: "#273649",
    },
    fourth: {
      main: "#589383",
    },
    info: {
      main: "#589383",
    },
    error: {
      light: "#FFE5EA",
      main: "#FF0033",
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
    topic: defaultTheme.palette.augmentColor({
      name: "topic",
      color: {
        main: "#215C9D",
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
    // fontSize: 16,
    blurb: {
      fontFamily: sansSerifFont,
      fontSize: "1em",
      fontWeight: "500",
      lineHeight: 1.4,
      marginBottom: 20,
    },
    body1: {
      fontSize: 14,
      lineHeight: 1.4,
    },
    body2: {
      fontFamily: sansSerifFont,
      fontWeight: 300,
      lineHeight: 1.4,
    },
    h1: {
      fontFamily: sansSerifFont,
      fontSize: "2.4em",
      fontWeight: 700,
      textAlign: "center",
    },
    h2: {
      fontFamily: sansSerifFont,
      fontSize: "1.9em",
      fontWeight: 700,
      marginBottom: 40,
    },
    h2_article: {
      fontFamily: serifFont,
      fontSize: "2em",
      fontWeight: 700,
      marginBottom: 16,
    },
    h3: {
      fontFamily: sansSerifFont,
      fontSize: "1.4em",
      fontWeight: 700,
      marginBottom: 20,
      textTransform: "uppercase",
    },
    h3_subheading: {
      fontFamily: sansSerifFont,
      fontSize: "1.4em",
      fontWeight: 700,
      marginBottom: 20,
    },
    h4: {
      fontFamily: sansSerifFont,
      fontSize: "1em",
      fontWeight: 700,
      marginBottom: 20,
      textTransform: "uppercase",
    },
    h5: {
      fontFamily: sansSerifFont,
      fontSize: "0.81em",
      marginBottom: 20,
      textTransform: "uppercase",
    },
    h5_card: {
      color: "rgba(0, 0, 0, 0.6)",
      fontFamily: sansSerifFont,
      fontSize: 12,
      marginTop: 0,
      marginBottom: 0,
      textTransform: "uppercase",
    },
    li: {
      fontSize: "1.1250em",
      lineHeight: "2.375em",
      fontWeight: 400,
    },
    quote: {
      fontFamily: sansSerifFont,
      fontSize: "1.1250em",
      fontWeight: 600,
    },
    tocText: {
      fontSize: "1.1250em",
      fontWeight: 400,
      lineHeight: "2.4em",
    },
    tableHeaderHome: {
      fontFamily: sansSerifFont,
      fontSize: "1em",
      fontWeight: 600,
      lineHeight: 1.4,
      textTransform: "uppercase",
    },
    tableHeader: {
      fontFamily: sansSerifFont,
      fontSize: "1em",
      fontWeight: 600,
      lineHeight: 1.4,
      textTransform: "uppercase",
    },
    trackerTitle: {
      fontFamily: sansSerifFont,
      fontSize: "1em",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    trackerTitleHome: {
      fontFamily: sansSerifFont,
      fontSize: "1.075em",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    trackerRowHome: {
      fontFamily: sansSerifFont,
      fontSize: "1em",
      fontWeight: 400,
      lineHeight: 1.4,
      textTransform: "uppercase",
    },
    trackerRow: {
      fontFamily: sansSerifFont,
      fontSize: "1em",
      fontWeight: 400,
      lineHeight: 1.4,
      textTransform: "uppercase",
    },
    subtitle1: {
      fontFamily: sansSerifFont,
      fontSize: "0.81em",
      fontWeight: 500,
      lineHeight: 1.4,
      textTransform: "uppercase",
    },
    supertitle: {
      fontFamily: sansSerifFont,
      fontSize: "1.2em",
      fontWeight: 500,
      marginBottom: 20,
      textTransform: "uppercase",
    },
    link: {
      color: "#FF0033",
      fontFamily: sansSerifFont,
      lineHeight: 1.4,
    },
    overline: {
      fontFamily: sansSerifFont,
      fontSize: "1.2em",
      fontWeight: 700,
      lineHeight: 1.4,
      textTransform: "none",
    },
  },
});

export default theme;
