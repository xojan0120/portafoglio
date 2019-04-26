// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
//import axios from 'axios';

// -------------------------------------------------------------------------------------------------
// * Import Test Data
// -------------------------------------------------------------------------------------------------
import testJson from '../test_data/test.json';

// order => 'new' or 'random'
export const getSiteList = (order) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testJson);
    },1000);
  });
  return promise;
}
