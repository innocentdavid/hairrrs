import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './styles/All.css';
import './styles/Fix.css';
import './styles/826.css';
import GlobalStore from './contexts/GlobalStore';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStore>
      <App />
    </GlobalStore>
  </React.StrictMode>,
  document.getElementById('root')
);