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
  responseType: 'json',
  withCredentials: true, // クッキーやセッションを扱うのに必要
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
  const option = { params: {page: page, uid: uid} };
  return ajax.get('/sites', option);
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
}

export const updateReactionCount = (siteId, reaction, token, uid) => {
  withAuthorizationHeader(token)
  return ajax.post(`/sites/${siteId}/reactions`, { reaction: reaction, uid: uid });
}

export const deleteReactionCount = (siteId, reaction, token, uid) => {
  withAuthorizationHeader(token)
  const option = { params: { reaction: reaction, uid: uid } };
  return ajax.delete(`/sites/${siteId}/reactions`, option);
}

export const checkReactionCount = (siteId, reaction, token, uid) => {
  withAuthorizationHeader(token)
  const option = { params: { reaction: reaction, uid: uid } };
  return ajax.get(`/sites/${siteId}/reactions/check`, option);
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
  return ajax.get(`/sites/${siteId}/screenshot`);
}

export const updateSiteScreenshot = (siteId, data, token, uid) => {
  withAuthorizationHeader(token)
  return ajax.post(`/sites/${siteId}/screenshot`, { screenshot: data, uid: uid });
}

export const deleteSiteScreenshot = (siteId, token, uid) => {
  withAuthorizationHeader(token)
  const option = { params: {uid: uid} };
  return ajax.delete(`/sites/${siteId}/screenshot`, option);
}

export const updateSiteInfo = (siteId, data, token, uid) => {
  withAuthorizationHeader(token)
  return ajax.post(`/sites/${siteId}/info`, Object.assign(data, {uid: uid}));
}

export const createSiteInfo = (data, token, uid) => {
  withAuthorizationHeader(token)
  return ajax.post(`/sites/info`, Object.assign(data, {uid: uid}));
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
  return ajax.post('/accounts', {uid: uid});
}

export const checkSite = (siteId) => {
  return ajax.get(`/sites/${siteId}/check`);
}
