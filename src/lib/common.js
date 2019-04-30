// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React, {useCallback} from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import { withStyles } from '@material-ui/core/styles';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import { SyncLoader as Loader } from 'react-spinners';
import PropTypes                from 'prop-types';
import {useDropzone}            from 'react-dropzone'

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import styles from '../css/style'

// ----------------------------------------------------------------------------------------
// * Common Function
// ----------------------------------------------------------------------------------------
//export const hide = (isLoading) => {
//  return isLoading ? {visibility: "hidden"} : {visibility: "visible"}
//}

// ----------------------------------------------------------------------------------------
// * Common Component
// ----------------------------------------------------------------------------------------
const LoaderBoxWithoutStyles = (props) => {
  return (
    <div className={props.classes.loaderBox}>
      <Loader margin="10px" size={30} color="#36D7B7"/>
    </div>
  );
}
export const LoaderBox = withStyles(styles)(LoaderBoxWithoutStyles);
LoaderBoxWithoutStyles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const Dropzone = ({caption, component, callBack}) => {
  const Component = component;

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload  = () => {
      const data = reader.result
      callBack(data);
    }
  }, [])
  const {getRootProps, getInputProps, open/*, isDragActive*/} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={{height:"100%"}}>
      <input {...getInputProps()} />
      { caption ? caption : null }
      { component ? <Component onClick={open}/> : null }
    </div>
  )
}
Dropzone.propTypes = {
  component: PropTypes.func,
  caption:   PropTypes.string,
  callBack:  PropTypes.func,
};
