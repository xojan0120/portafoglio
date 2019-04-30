export default (theme) => {
  return ({
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

  });
};
