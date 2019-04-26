// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import axios from 'axios';

// -------------------------------------------------------------------------------------------------
// * Import Test Data
// -------------------------------------------------------------------------------------------------
import testJson from '../test_data/test.json';

export const getSiteList = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve(testJson);
    },1000);
  });
  return promise;
}