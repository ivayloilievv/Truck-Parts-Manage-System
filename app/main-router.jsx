
'use strict';


import $ from './helpers/jquery-global';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute,  useRouterHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useQueries } from 'history';

import TruckPartsManageSystem from './components/views/truck-parts-manage-system';

import Home from './components/views/main/home';
import Login from './components/views/main/login';
import PartList from './components/views/parts/part-list';
import Part from './components/views/parts/part';
import successfulAdjustment from './components/views/parts/successfulAdjustment';
import changePart from './components/views/parts/changePart';
import UserList from './components/views/users/user-list';
import User from './components/views/users/user';

window.jQuery = $;
const appHistory = useQueries(useRouterHistory(createBrowserHistory))();

console.log('proba1');

ReactDOM.render((
  <Router history={appHistory}>
    <Route path="/" component={TruckPartsManageSystem}>
      <IndexRoute component={Home}/>
      <Route path="/home" component={Home} />
      <Route path="/parts" component={PartList} />
      <Route path="/part(/:partId)" component={Part} />
      <Route path="/changePart" component={changePart} />
      <Route path="/successfulAdjustment" component={successfulAdjustment} />
      <Route path="/users" component={UserList} />
      <Route path="/user(/:userId)" component={User} />
      <Route path="/login" component={Login}>
      </Route>
    </Route>
  </Router>

  // <Router history={browserHistory}>
  //   <Route path="/" component={App}>
  //     <Route path="about" component={About}/>
  //     <Route path="users" component={Users}>
  //       <Route path="/user/:userId" component={User}/>
  //     </Route>
  //     <Route path="*" component={NoMatch}/>
  //   </Route>
  // </Router>

), document.getElementById('root'));