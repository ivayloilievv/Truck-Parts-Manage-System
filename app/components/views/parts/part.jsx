
'use strict';

import React from 'react';
import $ from 'jquery';
import getMarkdown from '../../../helpers/get-markdown';
import Modal from '../../common/modal';


class Part extends React.Component {
  constructor(props, context) {
    super(props, context);

    let state = {
    
    };
   
    state.isEdit = this.props.isEdit ||
      (props.location && props.location.query && props.location.query.edit === 'true');
  
    if (props.part) {
      state.part = this.props.part;
    } else {
      state.part = {
        id: '',
        title: '',
        truckBrand: '',
        catalogNumber: '',
        storageSpase: '',        
        quantity: ''
      }
    }
    if (state.isEdit) {
      state.oldPart = $.extend(true, {}, state.part);
    }

    this.state = state;

    this.render = this.render.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }



  saveChanges() {
    this.setState({ oldPart: $.extend(true, {}, this.state.part) });
    if (this.state.part.id) { 
      this.context.partService.editPart(this.state.part).then(() => {     
        this.context.router.push({ pathname: `/parts`, query: { controls: true } });
      });
    } else {  
      this.context.partService.addNewPart(this.state.part).then(() => {    
        this.context.router.push({ pathname: `/parts`, query: { controls: true } });
      });
    }
  }


  handleTextChange(e) {
    let part = this.state.part;
    part[e.target.name] = e.target.value;
    this.setState({ part: part });
  }


  render() {
    let isEdit = this.state.isEdit;


    return (
      <div className="test">
        { isEdit ? (
          <h2>{!this.state.part.id ? "Add New" : "Edit"} Part</h2>
        ) : null}
        <h3 className="test-title">
          { (isEdit) ? (
            <input type="text" name="title" placeholder="Name the part ..." className="form-control"
              value={this.state.part.title} onChange={this.handleTextChange} />
          ) : (
              <span>{this.state.part.title}</span>
            ) }
        </h3>
        <div className="row">
          <table className="metadata table table-bordered table-striped col-xs-12 col-md-6 col-lg-4">
            <tbody>
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
              <tr>
                <td>Quantity</td>
                <td>
                  { (isEdit) ? (
                    <input type="text" name="quantity" placeholder="Quantity ..." className="form-control"
                      value={this.state.part.quantity} onChange={this.handleTextChange} />
                  ) :
                    (<span>{this.state.part.quantity}</span>
                    ) }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
            <div className="test-controls">
              <button type="button" className="btn btn-success" onClick={this.saveChanges}>Save Part</button>
            </div>                        
        <Modal modalId="test-cancel-confirm" title="Unsaved Edits Confirmation" onConfirm={this.confirmCancelEdit}>
          Your edits have NOT been saved. Are you sure you want to CANCEL without saving them?
        </Modal>
      </div>
    );
  }

}

Part.propTypes = {
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
  isEdit: React.PropTypes.bool
};

Part.contextTypes = {
  partService: React.PropTypes.object,
  router: React.PropTypes.object
};

export default Part;
