
'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class PartList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { tests: [] }
    this.addPart = this.addPart.bind(this);
    this.makeChange = this.makeChange.bind(this);
  }


  addPart() {
    const path = { pathname: '/part', query: { controls: true, edit: true } };
    this.context.router.push(path);
  }

  makeChange() {
    const path = { pathname: '/changePart', query: { controls: true, edit: true } };
    this.context.router.push(path);
  }

  render() {
  
    return (
      <section className="tests">
        <ReactCSSTransitionGroup transitionName="tests-head" transitionAppear={true} transitionAppearTimeout={500}
          transitionEnter={false} transitionLeave={false}>
          <h2>Manage Parts</h2>
          { true ? (
            <button type="button" className="btn btn-primary" onClick={this.addPart}>Add New Part</button>
          ) : null
          }
          <div>
          <p>    
          </p>
          </div>
          <div>
           { true ? (
            <button type="button" className="btn btn-primary" onClick={this.makeChange}>Make a change</button>
          ) : null
          }
          </div>
        </ReactCSSTransitionGroup>      
      </section>
    );
  }
}

PartList.contextTypes = {
  partService: React.PropTypes.object,
  router: React.PropTypes.object
};

PartList.defaultProps = {
  isControls: true
};


export default PartList;