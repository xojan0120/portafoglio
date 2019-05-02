// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import axios from 'axios';

// -------------------------------------------------------------------------------------------------
// * Import Test Data
// -------------------------------------------------------------------------------------------------
import testSites1         from '../test_data/get/sites1.json';
import testSites2         from '../test_data/get/sites2.json';
import testSites3         from '../test_data/get/sites3.json';
import testSites4         from '../test_data/get/sites4.json';
import testUnits          from '../test_data/get/periodUnits.json';
import testSkills         from '../test_data/get/skills.json';
import testReactionsCount from '../test_data/get/reactionsCount.json';
import testViewCount      from '../test_data/get/viewCount.json';
import testSiteInfo       from '../test_data/get/siteInfo.json';
import testAuthSiteOwner  from '../test_data/get/authSiteOwner.json';

import notFoundJson from '../test_data/notFound.json';

// order => 'new' or 'random'
export const getSiteList = (page, order) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let json = null;
      switch (page) {
        case 1:
          json = testSites1;
          break;
        case 2:
          json = testSites2;
          break;
        case 3:
          json = testSites3;
          break;
        case 4:
          json = testSites4;
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
      resolve(testUnits);
    },1000);
  });
  return promise;
}

export const getSkills = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testSkills);
    },1000);
  });
  return promise;
}

export const getReactionsCount = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testReactionsCount);
    },1000);
  });
  return promise;
}

export const getViewCount = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testViewCount);
    },1000);
  });
  return promise;
}

export const getSiteInfo = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testSiteInfo);
    },1000);
  });
  return promise;
}

export const authSiteOwner = (siteId, token) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testAuthSiteOwner);
    },1000);
  });
  return promise;
}

const instance = axios.create({ 
  baseURL: 'http://192.168.33.10:3001/api/v1/',
  //headers: {
  //  'Authorization': 'Bearer TEST-TOKEN'
  //},
});

export const updateSiteInfo = (data, token) => {
  if (token) {
    instance.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${token}`;
      return config
    })
  }
  const promise = instance.post('/items/auth3', {title: "にほんご ふが"});
  promise
    .then(res => {
      console.log(res);
      console.log(res.status);
      console.log(res.data.message);
      console.log(res.data.title);
    })
    .catch(error => {
      console.log(error.message);
    });
}
