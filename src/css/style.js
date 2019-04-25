export default (theme) => {
  return ({
    siteTitle: {
      marginTop: 10,
    },

    siteTitleLink: {
      textDecoration: 'none',
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
  });
};
