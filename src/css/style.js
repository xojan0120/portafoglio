export default (theme) => {
  return ({
    rootLink: {
      textDecoration: 'none',
      marginRight:    20,
      color:          'white',
      '&:hover': {
        textDecoration: 'none',
      }
    },

    login: {
      marginLeft: 'auto',
    },

    toolbar: {
      paddingTop: 10,
    },

    menuIcon: {
      // 幅600px以上の場合
      '@media screen and (min-width:600px)': { display: 'none' }
    },

    menuItem: {
      // 幅600px未満の場合
      '@media screen and (max-width:599px)': { display: 'none' }
    },
  });
};
