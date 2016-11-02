'use strict';

import React from 'react';
import Navigation from './main/navigation';
import UserService from '../../services/user.service'
import PartService from '../../services/part.service'
import LocaleService from '../../services/locale.service'

const USER_SERVICE_URL = '/api/users';
const Part_SERVICE_URL = '/api/parts';
const DEFAULT_LOCALE = 'bg';


class TruckPartsManageSystem extends React.Component {
  constructor(props) {
    super(props);
    this.userServiceSingleton = new UserService(USER_SERVICE_URL);
    this.partServiceSingleton = new PartService(Part_SERVICE_URL);
    this.onLocaleChange = this.onLocaleChange.bind(this);
    this.localeServiceSingleton = new LocaleService(DEFAULT_LOCALE, this.onLocaleChange);
  }

 getChildContext() {
    return {
      userService: this.userServiceSingleton,
      localeService: this.localeServiceSingleton,
      partService: this.partServiceSingleton
    };
  }

  onLocaleChange() {
    this.setState({});
  }

  render() {
    return (
      <main>
        <Navigation />

        {/* Here routed components go ... */}
        <div className="container">
          {this.props.children}
        </div>
      </main>
    );
  }
}

TruckPartsManageSystem.propTypes = {
  children: React.PropTypes.node
}


TruckPartsManageSystem.childContextTypes = {
  userService: React.PropTypes.object,
  localeService: React.PropTypes.object,
  partService: React.PropTypes.object
};


export default TruckPartsManageSystem;