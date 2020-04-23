const breakpoints = {
  desktop: 1024,
  tablet: 768
};

const baseline = 5;

const generateBreakpoint = (width: number, cssMarkup: any) => `
@media (min-width: ${width}px) {
  ${cssMarkup};
}
`;

const theme = {
  fonts: {
    OpenSans: "Open Sans, sans-serif",
    PingFangSC: "PingFangSC, sans-serif"
  },
  baseline,
  outline: baseline * 4,
  colors: {
    tooltip: {
      info: {
        border: "#3758B7",
        background: "#EAEFF9"
      },
      error: {
        border: "#F74C4C",
        background: "#FFECED"
      },
      warning: {
        border: "#FF9347",
        background: "#FFF5EC"
      },
      success: {
        border: "#42C3A4",
        background: "#E9FAF5"
      }
    },
    sync: {
      success: "#00c7a2",
      info: "#3356BE",
      warning: "#FF8D2D",
      error: "#FF3643"
    },
    primary: {
      default: "#FFC300",
      medium: "#F2B200",
      dark: "#C69100"
    },
    secondary: {
      default: "#F8F3E7"
    },
    gray: {
      default: "#E5E5E5",
      medium: "#E9EAEB",
      dark: "#7F7F7F",
      darker: "#555",
      regular: "#CCCCCC"
    },
    light: {
      default: "#FFF",
      medium: "#F7F7F7",
      dark: "#f2f2f2"
    },
    dark: {
      default: "#191919",
      black: "#000",
      medium: "#949494"
    },
    success: {
      default: "#00c7a2",
      medium: "#00c7a5"
    },
    info: "#24D3E7",
    danger: "#FF3643",
    others: {
      lightPurple: "#d9deff",
      blue: "#0091FF",
      orange: "#FF9347",
      yellow: "#FFC436",
      darkBlue: "#3358B8",
      green: "#58C5A7",
      lightBlue: "#F6F6FB",
      lightOrange: "#FEF9F5",
      lightGreen: "#ECF9F6"
    }
  },
  media: Object.keys(breakpoints).reduce((acc, label) => {
    acc[label] = (...args) => generateBreakpoint(breakpoints[label], args);

    return acc;
  }, {})
};

export default theme;
