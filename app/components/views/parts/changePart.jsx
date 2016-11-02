'use strict';

import React from 'react';
import $ from 'jquery';
import getMarkdown from '../../../helpers/get-markdown';
import Modal from '../../common/modal';

class changePart extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Initialize state
    let state = {
      
    };

    // Determine working mode flags
    state.isControls = this.props.isControls ||
      (props.location && props.location.query && props.location.query.controls === 'true');
    state.isEdit = this.props.isEdit;
     
  

    // Get or create test data
    if (props.part) {
      state.part = this.props.part;
    } else {
      // Default test initialization
      state.part = {
        id: '',
        title: '',
        truckBrand: '',
        catalogNumber: '',
        storageSpase: '',        
        quantity: ''
      }

      // Read id from route param testId
      if (props.params && props.params.partId) {
        // state.test = data.find((test) => test.id === this.props.params.testId);

        // Load test by id
        context.partService.getTestById(this.props.params.partId).then((part) => {
          let newState = this.state;
          newState.part = part;
          if (newState.isEdit) {
            newState.oldPart = $.extend(true, {}, part); //needed in edit mode only for reset
          }
          this.setState(newState);
        });
      }
    }

    if (state.isEdit) {
      state.oldPart = $.extend(true, {}, state.part);
    }

    this.state = state;

    this.render = this.render.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.getPartByCatalogNumber = this.getPartByCatalogNumber.bind(this);
    this.makeAdjustment = this.makeAdjustment.bind(this);
  }


  getPartByCatalogNumber() {
      this.context.partService.getPartByCatalogNumber(this.state.part.catalogNumber).then((result) => {
           console.log(result);
           this.setState( {isEdit : true} );
           this.setState( {part : result} );
        
      });
  }


  handleTextChange(e) {
    let part = this.state.part;
    part[e.target.name] = e.target.value;
    this.setState({ part: part });
  }

 
  makeAdjustment() {
    let part = this.state.part;
    part.id = part._id;
    delete part._id;
    delete part.questions;
    this.setState( { part : part } );
    this.context.partService.editPart(this.state.part).then((result) => {
      if(result.title !== undefined){
        this.context.router.push({ pathname: `/successfulAdjustment`, query: { controls: true, edit: false } });
      }
      else{
        console.log('Not found');
      }
    });
  }
 
  render() {
    let isControls = this.state.isControls;
    let isEdit = this.state.isEdit;


    return (
      <div className="test">
        { !isEdit ? (
          <h2>{!this.state.part.id ? "Change" : "Edit"} Part</h2>
        ) : null}
        <h3 className="test-title">
          { (!isEdit) ? (
            <input type="text" name="catalogNumber" placeholder="Part catalog number ..." className="form-control"
              value={this.state.part.catalogNumber} onChange={this.handleTextChange} />
          ) : (
              <span>{this.state.part.title}</span>
            ) }
        </h3>
        <div className="row">
          <table className="metadata table table-bordered table-striped col-xs-12 col-md-6 col-lg-4">
            <tbody>
            { (isEdit) ? (
              <tr>
                <td>Truck Brand</td>
                <td>
                  { (isEdit) ? (
                    <input type="text" name="truckBrand" placeholder="Truck brand ..." className="form-control"
                      value={this.state.part.truckBrand} onChange={this.handleTextChange} />
                  ) :
                    (<span dangerouslySetInnerHTML={getMarkdown(this.state.part.truckBrand) } />
                    ) }
                </td>
              </tr>
              ) : null }
              { (isEdit) ? (
                <tr>
                  <td>Catalog Number</td>
                  <td>
                   { (isEdit) ? (
                    <input type="text" name="catalogNumber" placeholder="Catalog number ..." className="form-control"
                      value={this.state.part.catalogNumber} onChange={this.handleTextChange} />
                  ) :
                    (<span dangerouslySetInnerHTML={getMarkdown(this.state.part.catalogNumber) } />
                    ) }
                  </td>
                </tr>
              ) : null }
              { (isEdit) ? (
              <tr>
                <td>Storage Spase</td>
                <td>
                  { (isEdit) ? (
                    <input type="text" name="storageSpase" placeholder="Storage Spase ..." className="form-control"
                      value={this.state.part.storageSpase} onChange={this.handleTextChange} />
                  ) :
                    (<span>{this.state.part.storageSpase}</span>
                    ) }
                </td>
              </tr>
              ) : null }
              { (isEdit) ? (
              <tr>           
                <td>Quantity</td>
                <td>
                  { (isEdit) ? (
                    <input type="text" name="quantity" placeholder="Quantity ..." className="form-control"
                      value={this.state.part.quantity} onChange={this.handleTextChange} />
                  ): null
                  }
                </td>
              </tr>
              ) : null }
            </tbody>
          </table>
        </div>

        { isControls ?
          (!isEdit ? (
            <div className="test-controls">
              <button type="button" className="btn btn-success" onClick={this.getPartByCatalogNumber}>Change Part</button>
            </div>
          ) : (
              <div className="test-controls">
                <button type="button" className="btn btn-warning" onClick={this.makeAdjustment}>Save changes</button>
              </div>
            )
          ) : null
        }
        <Modal modalId="test-cancel-confirm" title="Unsaved Edits Confirmation" onConfirm={this.confirmCancelEdit}>
          Your edits have NOT been saved. Are you sure you want to CANCEL without saving them?
        </Modal>
      </div>
    );
  }

}

changePart.propTypes = {
  params: React.PropTypes.object,
  location: React.PropTypes.object,
  part: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    truckBrand: React.PropTypes.string,
    catalogNumber: React.PropTypes.string.isRequired,
    storageSpase: React.PropTypes.string.isRequired,
    quantity: React.PropTypes.string.isRequired
  }),
  isControls: React.PropTypes.bool,
  isEdit: React.PropTypes.bool
};

changePart.contextTypes = {
  partService: React.PropTypes.object,
  router: React.PropTypes.object
};

export default changePart;
