import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

// Hot module reloading
if (module.hot) {
  module.hot.accept();
}
