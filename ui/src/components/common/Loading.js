import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <FontAwesomeIcon className="text-orange-600" size="3x" icon="spinner" pulse />
  </div>
);

export default Loading;
