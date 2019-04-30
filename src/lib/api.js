// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
//import axios from 'axios';

// -------------------------------------------------------------------------------------------------
// * Import Test Data
// -------------------------------------------------------------------------------------------------
import testSites1         from '../test_data/sites1.json';
import testSites2         from '../test_data/sites2.json';
import testSites3         from '../test_data/sites3.json';
import testSites4         from '../test_data/sites4.json';
import testUnits          from '../test_data/periodUnits.json';
import testSkills         from '../test_data/skills.json';
import testReactionsCount from '../test_data/reactionsCount.json';
import testViewCount      from '../test_data/viewCount.json';
import testSiteInfo       from '../test_data/siteInfo.json';

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
