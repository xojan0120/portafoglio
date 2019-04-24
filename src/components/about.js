import React from 'react';

export default props => {
  console.log(props);
  return (
    <div>
      <div>this is hello</div>
      <div>param is {props.param}</div>
    </div>
  );
};
