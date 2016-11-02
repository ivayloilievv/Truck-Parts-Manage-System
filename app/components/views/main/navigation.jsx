'use strict';

import React from 'react';
import NavLink from '../../navigation/nav-link';

const Navigation = () => {



  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
         <h3>Truck Parts Manage System</h3>
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>          
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">

          <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
              
           
            <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
            <li><NavLink to={{ pathname: '/parts', query: { controls: true } }} >Parts</NavLink></li>
            
         <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
          <li><a href="#/newsFeed"></a></li>
          
            <li className="dropdown">
              <NavLink to="/users" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Login / Register <span className="caret"></span></NavLink>
              <ul className="dropdown-menu">
                <li><NavLink to={{ pathname: '/users', query: { controls: true } }} >Available Users</NavLink></li>
                <li><NavLink to={{ pathname: '/user', query: { controls: true, edit: true } }} >Register New User</NavLink></li>
                <li role="separator" className="divider"></li>
                <li><NavLink to="/login">Login</NavLink></li>
              </ul>
            </li>
          </ul>   
        </div>       
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  children: React.PropTypes.node
}

Navigation.contextTypes = {
  router: React.PropTypes.object
};

export default Navigation;