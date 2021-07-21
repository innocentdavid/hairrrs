import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './styles/All.css';
import './styles/Fix.css';
import './styles/826.css';
import './styles/Chat.css';
import './styles/Attachment.css';
import GlobalStore from './contexts/GlobalStore';

const root = document.getElementById('root')
const modalRroot = document.getElementById('modal-root')

class Modal extends React.Component {
  render() {
    return (<>
    hello
    </>)
  }
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStore>
      <App />
    </GlobalStore>
  </React.StrictMode>,
  document.getElementById('root')
);