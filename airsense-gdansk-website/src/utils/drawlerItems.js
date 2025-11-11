const drawrerItems = [
  {
    to: '/main',
    name: 'dashboard.drawler.stronaGlowna',
    iconName: 'MAIN_PAGE_DRAWLER',
    iconNameActive: 'MAIN_PAGE_DRAWLER_ACTIVE',
    moduleName: 'main',
  },
  {
    to: '/main/map',
    name: 'dashboard.drawler.mapa',
    iconName: 'MAP_DRAWLER',
    iconNameActive: 'MAP_DRAWLER_ACTIVE',
    moduleName: 'maps',
  },
  // {
  //   to: "calendar",
  //   name: "Kalendarz",
  //   iconName: "CALENDAR_DRAWLER",
  //   iconNameActive: "CALENDAR_DRAWLER_ACTIVE",
  //   moduleName: "calendar",
  // },
  {
    to: '/main/locations',
    name: 'dashboard.drawler.lokalizacje',
    iconName: 'LOCATIONS_DRAWLER',
    iconNameActive: 'LOCATIONS_DRAWLER_ACTIVE',
    moduleName: 'locations',
  },
  {
    to: '/main/raports',
    name: 'dashboard.drawler.raporty',
    iconName: 'FILE_DRAWLER',
    iconNameActive: 'FILE_DRAWLER_ACTIVE',
    moduleName: 'raports',
  },
]

const drawrerItemsExit = [
  // {
  //   to: '/main/help',
  //   name: 'Dodatkowe informacje',
  //   iconName: 'HELP_DRAWLER',
  //   iconNameActive: 'HELP_DRAWLER_ACTIVE',
  //   moduleName: 'help',
  // },
  {
    to: '/',
    name: 'dashboard.drawler.wylogowanie',
    iconName: 'EXIT_DRAWLER',
    iconNameActive: 'EXIT_DRAWLER',
    moduleName: 'landing-page',
  },
]

export { drawrerItems, drawrerItemsExit }
