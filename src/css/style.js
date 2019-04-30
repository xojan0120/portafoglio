export default (theme) => {
  return ({
    siteTitle: {
      marginTop: 10,
    },

    siteTitleLink: {
      marginRight:    20,
      color:          'white',
      '&:hover': {
        textDecoration: 'none',
      },
      '&:visited': {
        color:          'white',
      },
    },

    login: {
      marginLeft: 'auto',
    },

    toolbar: {
      //paddingTop: 10,
    },

    // 幅600px以上の場合に非表示
    hideLg: {
      '@media screen and (min-width:600px)': { display: 'none' }
    },

    // 幅600px未満の場合に非表示
    hideSm: {
      '@media screen and (max-width:599px)': { display: 'none' }
    },

    avatarIcon: {
      fontSize: 40,
    },

    avatar: {
      display: 'inline-table',
    },

    menuIconForSm: {
      marginLeft: 10,
    },

    card: {
      margin: 15,
      flexBasis: 345, // flexbox内要素の幅
      '&:hover': {
        textDecoration: 'none',
      },
    },

    siteListMedia: {
      height: 200,
    },

    loaderBox: {
      marginTop: 30,
      textAlign: 'center',
    },

    siteScreenshotCard: {
      // 幅600px以上の場合
      '@media screen and (min-width:600px)': { height: '80vh' },
      // 幅600px未満の場合
      '@media screen and (max-width:599px)': { height: '30vh' },
    },

    pointer: {
      cursor: "pointer",
    },

    siteScreenshotMedia: {
      height: '95%',
    },

    siteScreenshotActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingTop: 5,
    },

    noImage: {
      textAlign: 'center',
    },

    noImageIcon: {
      fontSize: 500,
    },

    warning: {
      color: 'red',
    },

  });
};
