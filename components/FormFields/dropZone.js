import React, {useMemo, useCallback, useState, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import client from '../APIs/filestack';
import { InputField } from '../FormFields';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 4,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function dropZone(props) {

  const [uploadUrl, setUploadUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    if(acceptedFiles) {
      client.upload(acceptedFiles[0])
      .then(res => {
        console.log('success: ', res.url);
        setUploadUrl(res.url);
      }).catch(err => {
        console.log(err);
      });
    }
  }, []);

  useEffect(() => {
    onDrop();
  }, [onDrop]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: 'image/*', onDrop});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      Upload Url: <a style={{color: "#52BCD3"}} href={uploadUrl} target="_blank">{uploadUrl}</a>
      <InputField label={props.url.label} name={props.url.name} onChange={props.handleChange} type="hidden" value={uploadUrl}>{uploadUrl}</InputField>
    </div>
  );
}

<dropZone />