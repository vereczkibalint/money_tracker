import React from 'react';

const Error = ({error}) => (
    <div className="alert alert-danger">
      {console.log(error)}
      {error.msg}
    </div>
);

export default Error;