import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/Login';
import Register from './components/Register';
import Create from './components/Create';
import Update from './components/Upd';
import CreateCom from './components/CreateCom';
import Showcomment from './components/Showcomment';
ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/create' component={Create} />
		<Route path='/update' component={Update} />
		<Route path='/addcomment' component={CreateCom} />
		<Route path='/showcomment' component={Showcomment} />
      </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
