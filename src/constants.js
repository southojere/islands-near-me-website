const SESSION_FILTERS = {
  NEARME: {
    VALUE: "NEARME",
    TEXT: "NEAR ME"
  },
  ALL: {
    VALUE: "ALL",
    TEXT: "ALL"
  }
};

const DEFAULT_SEARCH_RADIUS = 50; //50km
const MAX_SEARCH_DISTANCE = 100; // 200km

const VISITORS = {
  CELESTE: {
    VALUE: 1,
    TEXT: "Celeste"
  },
  SAHARAH: {
    VALUE: 2,
    TEXT: "Saharah"
  },
  KICKS: {
    VALUE: 3,
    TEXT: "Kicks"
  },
  FLICK: {
    VALUE: 4,
    TEXT: "Flick"
  },
  CJ: {
    VALUE: 5,
    TEXT: "CJ"
  },
  LEIF: {
    VALUE: 6,
    TEXT: "Leif"
  },
  REDD: {
    VALUE: 7,
    TEXT: "Redd"
  }
};


const TABLET_THRESHOLD_WIDTH = 768;
const MOBILE_THRESHOLD_WIDTH = 480;

export { SESSION_FILTERS, DEFAULT_SEARCH_RADIUS, MAX_SEARCH_DISTANCE,VISITORS,TABLET_THRESHOLD_WIDTH, MOBILE_THRESHOLD_WIDTH };
