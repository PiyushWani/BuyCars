import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import 'tachyons';
import Main from './Container/Main';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Main />, document.getElementById('root'));

serviceWorker.unregister();
