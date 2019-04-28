// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
//import axios from 'axios';

// -------------------------------------------------------------------------------------------------
// * Import Test Data
// -------------------------------------------------------------------------------------------------
import testJson1    from '../test_data/page1.json';
import testJson2    from '../test_data/page2.json';
import testJson3    from '../test_data/page3.json';
import testJson4    from '../test_data/page4.json';
import notFoundJson from '../test_data/notFound.json';

// order => 'new' or 'random'
export const getSiteList = (page, order) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      let json = null;
      switch (page) {
        case 1:
          json = testJson1;
          break;
        case 2:
          json = testJson2;
          break;
        case 3:
          json = testJson3;
          break;
        case 4:
          json = testJson4;
          break;
        default:
          json = notFoundJson;
      }
      resolve(json);
    },1000);
  });
  return promise;
}
