import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './styles/globals.css';
import './styles/All.css';
import './styles/Fix.css';
import './styles/826.css';
import './styles/Chat.css';
import './styles/Attachment.css';
import './styles/react-confirm-alert.css';
import './styles/forgotPasswordModal.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; import
'mdbreact/dist/css/mdb.css';
import GlobalStore from './contexts/GlobalStore';
import { customAlert } from './myFunctions';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStore>
      <div id="loadingModal">
        <img src="/images/kloader.gif" alt="Loading..." width="200px" height="200px" />
      </div>

      <div id="customAlert">
        <div className="msgCard">
          <div id="msgCardBody"></div>
          <button className="btnSolid" onClick={() => { customAlert('', 'close') }}>close</button>
        </div>
      </div>
      
      <App />
    </GlobalStore>
  </React.StrictMode>,
  document.getElementById('root')
);