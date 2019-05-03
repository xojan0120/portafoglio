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
import testGetSites1         from '../test_data/get/sites1.json';
import testGetSites2         from '../test_data/get/sites2.json';
import testGetSites3         from '../test_data/get/sites3.json';
import testGetSites4         from '../test_data/get/sites4.json';
import testGetUnits          from '../test_data/get/periodUnits.json';
import testGetSkills         from '../test_data/get/skills.json';
import testGetReactionsCount from '../test_data/get/reactionsCount.json';
import testGetViewCount      from '../test_data/get/viewCount.json';
import testGetSiteInfo       from '../test_data/get/siteInfo.json';
import testGetAuthSiteOwner  from '../test_data/get/authSiteOwner.json';
import testPostSiteInfo      from '../test_data/post/siteInfo.json';

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
const withAuth = (token) => {
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
// order => 'new' or 'random'
export const getSiteList = (page, order) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let json = null;
      switch (page) {
        case 1:
          json = testGetSites1;
          break;
        case 2:
          json = testGetSites2;
          break;
        case 3:
          json = testGetSites3;
          break;
        case 4:
          json = testGetSites4;
          break;
        default:
          json = notFoundJson;
      }
      resolve(json);
    },1000);
  });
  return promise;
}


export const getPeriodUnits = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testGetUnits);
    },1000);
  });
  return promise;
}

export const getSkills = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testGetSkills);
    },1000);
  });
  return promise;
}

export const getReactionsCount = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testGetReactionsCount);
    },1000);
  });
  return promise;
}

export const getViewCount = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testGetViewCount);
    },1000);
  });
  return promise;
}

export const getSiteInfo = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testGetSiteInfo);
    },1000);
  });
  return promise;
}

export const authSiteOwner = (siteId, token) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testGetAuthSiteOwner);
    },1000);
  });
  return promise;
}

export const updateSiteInfo = (data, token, uid) => {
  console.log(token);
  withAuth(token)
  const promise = ajax.post('/items/auth3', Object.assign(data, {uid: uid}));
  //promise
  //  .then(res => {
  //    console.log(res);
  //    console.log(res.status);
  //    console.log(res.data.message);
  //  })
  //  .catch(error => {
  //    console.log(error.message);
  //  });
  
  //console.log(data);
  //const promise = new Promise((resolve, reject) => {
  //  setTimeout(()=> {
  //    resolve(testPostSiteInfo);
  //  },1000);
  //});
  return promise;
}
