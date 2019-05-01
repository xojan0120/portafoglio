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

  });
};
