// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import axios from 'axios';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import { cmnApiEndpointUri } from './constants';

// -------------------------------------------------------------------------------------------------
// * Import Test Data
// -------------------------------------------------------------------------------------------------
// Get
import testGetSites1          from '../test_data/get/sites1.json';
import testGetSites2          from '../test_data/get/sites2.json';
import testGetSites3          from '../test_data/get/sites3.json';
import testGetSites4          from '../test_data/get/sites4.json';
import testGetMySites         from '../test_data/get/mySites.json';
import testGetUnits           from '../test_data/get/periodUnits.json';
import testGetSkills          from '../test_data/get/skills.json';
import testGetReactionsCount  from '../test_data/get/reactionsCount.json';
import testGetViewCount       from '../test_data/get/viewCount.json';
import testGetSiteInfo        from '../test_data/get/siteInfo.json';
import testGetAuthSiteOwner   from '../test_data/get/authSiteOwner.json';
import testGetSiteScreenshot  from '../test_data/get/siteScreenshot.json';
import testGetUserInfo        from '../test_data/get/userInfo.json';
import testGetUsername        from '../test_data/get/username.json';

// Post
import testPostSiteInfo       from '../test_data/post/siteInfo.json';
import testPostSiteScreenshot from '../test_data/post/siteScreenshot.json';
import testPostSiteReaction   from '../test_data/post/siteReaction.json';
import testPostSiteView       from '../test_data/post/siteView.json';
import testPostAvatar         from '../test_data/post/avatar.json';

// Delete
import testDeleteSiteScreenshot from '../test_data/delete/siteScreenshot.json';
import testDeleteSite           from '../test_data/delete/site.json';
import testDeleteAvatar         from '../test_data/delete/avatar.json';

// Other
import notFoundJson from '../test_data/notFound.json';

// -------------------------------------------------------------------------------------------------
// * Axios initialize
// -------------------------------------------------------------------------------------------------
const ajax = axios.create({ 
  baseURL: cmnApiEndpointUri,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // クロスドメインの場合必要
  },
  responseType: 'json'
});

// -------------------------------------------------------------------------------------------------
// * Axios related functions
// -------------------------------------------------------------------------------------------------
const withAuthorizationHeader = (token) => {
  if (token) {
    ajax.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${token}`;
      return config
    })
  }
}

// -------------------------------------------------------------------------------------------------
// * API functions
// -------------------------------------------------------------------------------------------------
export const getSiteList = (page, uid) => {
  const data = { params: {page: page, uid: uid} };
  return ajax.get('/sites', data);

  //const promise = new Promise((resolve, reject) => {
  //  setTimeout(() => {
  //    let json = null;
  //    switch (page) {
  //      case 1:
  //        json = testGetSites1;
  //        break;
  //      case 2:
  //        json = testGetSites2;
  //        break;
  //      case 3:
  //        json = testGetSites3;
  //        break;
  //      case 4:
  //        json = testGetSites4;
  //        break;
  //      default:
  //        json = notFoundJson;
  //    }
  //    if (uid) { 
  //      if (page <= 1) {
  //        json = testGetMySites;
  //      } else {
  //        json = notFoundJson;
  //      }
  //    } 
  //    resolve(json);
  //  },1000);
  //});
  //return promise;
}


export const getPeriodUnits = () => {
  return ajax.get('/units');

  //const promise = new Promise((resolve, reject) => {
  //  setTimeout(()=> {
  //    resolve(testGetUnits);
  //  },1000);
  //});
  //return promise;
}

export const getSkills = () => {
  return ajax.get('/skills');

  //const promise = new Promise((resolve, reject) => {
  //  setTimeout(()=> {
  //    resolve(testGetSkills);
  //  },1000);
  //});
  //return promise;
}

export const getReactionsCount = (siteId) => {
  return ajax.get(`/sites/${siteId}/reactions`);

  //const promise = new Promise((resolve, reject) => {
  //  setTimeout(()=> {
  //    resolve(testGetReactionsCount);
  //  },1000);
  //});
  //return promise;
}

export const updateReactionCount = (siteId, reaction, token, uid) => {
  withAuthorizationHeader(token)
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testPostSiteReaction);
    },1000);
  });
  return promise;
}

export const getViewCount = (siteId) => {
  return ajax.get(`/sites/${siteId}/views`);

  //const promise = new Promise((resolve, reject) => {
  //  setTimeout(()=> {
  //    resolve(testGetViewCount);
  //  },1000);
  //});
  //return promise;
}

export const updateViewCount = (siteId) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testPostSiteView);
    },1000);
  });
  return promise;
}

export const getSiteInfo = (siteId) => {
  return ajax.get(`/sites/${siteId}/info`);

  //const promise = new Promise((resolve, reject) => {
  //  setTimeout(()=> {
  //    resolve(testGetSiteInfo);
  //  },1000);
  //});
  //return promise;
}

export const authSiteOwner = (siteId, token) => {
  withAuthorizationHeader(token)
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testGetAuthSiteOwner);
    },1000);
  });
  return promise;
}

export const judgeUser = (uid, token) => {
  const response = {
    "status":  200,
    "data": {
      "message": "success",
      "result":  "true",
    }
  }
  withAuthorizationHeader(token)
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(response);
    },1000);
  });
  return promise;
}

export const judgeSite = (siteId, uid, token) => {
  const response = {
    "status":  200,
    "data": {
      "message": "success",
      "result":  "true",
    }
  }
  withAuthorizationHeader(token)
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(response);
    },1000);
  });
  return promise;
}

export const getSiteScreenshot = (siteId) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testGetSiteScreenshot);
    },1000);
  });
  return promise;
}

export const uploadSiteScreenshot = (data, token, uid) => {
  withAuthorizationHeader(token)
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testPostSiteScreenshot);
    },1000);
  });
  return promise;
}

export const deleteSiteScreenshot = (siteId, token, uid) => {
  withAuthorizationHeader(token)
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testDeleteSiteScreenshot);
    },1000);
  });
  return promise;
}

export const updateSiteInfo = (data, token, uid) => {
  withAuthorizationHeader(token)
  
  //const promise = new Promise((resolve, reject) => {
  //  setTimeout(()=> {
  //    resolve(testPostSiteInfo);
  //  },1000);
  //});
  //return promise;

  const promise = ajax.post('/items/auth3', Object.assign(data, {uid: uid}));
  promise
    .then(res => {
      console.log(res);
      console.log(res.status);
      console.log(res.data.message);
    })
    .catch(error => {
      console.log(error.message);
    });
  return promise;
}

export const deleteSite = (siteId, token, uid) => {
  withAuthorizationHeader(token)
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testDeleteSite);
    },1000);
  });
  return promise;
}

export const getUserInfo = (uid) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testGetUserInfo);
    },1000);
  });
  return promise;
}

export const getUsername = (uid) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testGetUsername);
    },1000);
  });
  return promise;
}

export const updateNickname = (uid, token, nickname) => {
  const response = {
    "status":  200,
    "data": {
      "message": "success",
    }
  }
  withAuthorizationHeader(token)
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(response);
    },1000);
  });
  return promise;
}

export const deleteAccount = (uid, token) => {
  const response = {
    "status":  200,
    "data": {
      "message": "success",
    }
  }
  withAuthorizationHeader(token)
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(response);
    },1000);
  });
  return promise;
}

export const createAccount = (token, uid) => {
  withAuthorizationHeader(token)
  const data = {uid: uid}
  return ajax.post('/accounts', data);
}

export const checkSite = (siteId) => {
  return ajax.get(`/sites/${siteId}/check`);
}
