import React from 'react';
import Button from './components/common/Button';
import './register-css';

const App = () => {
  return (
    <div>
      <Button action="primary">
        Primary Button
      </Button>
      <Button>
        Default Button
      </Button>
      <Button action="danger">
        Danger Button
      </Button>
      <Button action="warning">
        Warning Button
      </Button>
      <Button action="success">
        Success Button
      </Button>
    </div>
  );
}

export default App;
