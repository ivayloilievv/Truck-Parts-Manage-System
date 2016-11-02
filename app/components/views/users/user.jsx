
'use strict';

import React from 'react';
import LocalizedStrings from 'react-localization';
import $ from 'jquery';
import Modal from '../../common/modal';

const messages = new LocalizedStrings({
  en: {
    addNew: 'Add New',
    edit: 'Edit',
    user: 'User',
    firstName: 'First Name',
    lastName: 'Last Name'
  }
 // bg: {
 //   addNew: 'Добавяне на нов',
 //   edit: 'Редактиране на',
 //   user: 'потребител',
 //   firstName: 'Собствено име',
 //   lastName: 'Фамилно име'
 // }
});


class User extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Initialize state
    let state = {};

    // Determine working mode flags
    state.isControls = this.props.isControls ||
      (props.location && props.location.query && props.location.query.controls === 'true');
    state.isEdit = this.props.isEdit ||
      (props.location && props.location.query && props.location.query.edit === 'true');

    // Get or create user data
    if (props.user) {
      state.user = this.props.user;
    } else {
      // Default user initialization
      state.user = {
        id: '',
        email: '',
        fname: '',
        lname: '',
        password: '',
        password2: ''
      }

      // Read id from route param userId
      if (props.params && props.params.userId) {
        // state.user = data.find((user) => user.id === this.props.params.userId);

        // Load user by id
        context.userService.getUserById(this.props.params.userId).then((user) => {
          user.password2 = user.password;
          let newState = this.state;
          newState.user = user;
          if (newState.isEdit) {
            newState.oldUser = $.extend(true, {}, user); //needed in edit mode only for reset
          }
          this.setState(newState);
        });
      }
    }

    if (state.isEdit) {
      state.oldUser = $.extend(true, {}, state.user);
    }

    this.state = state;

    // Bind methods to this
    this.render = this.render.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    messages.setLanguage(context.localeService.getLocale());
  }

  saveChanges() {
    let newUser = $.extend(true, {}, this.state.user);
    //check if password is valid
    if (!newUser.password || !newUser.password2 || newUser.password !== newUser.password2 || newUser.password.length < 8) {
      $('#invalid-password').modal();
      return;
    }
    delete (newUser.password2);
    if (newUser.id) { // edit user mode
      this.context.userService.editUser(newUser).then(() => {
        //return back to users collection
        this.context.router.push({ pathname: `/users`, query: { controls: true } });
      });
    } else {  // add new user mode
      this.context.userService.addNewUser(newUser).then(() => {
        //return back to users collection
        this.context.router.push({ pathname: `/users`, query: { controls: true } });
      });
    }
  }


  handleTextChange(e) {
    let user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({ user: user });
  }

  editUser() {
    const path = { pathname: `/user/${this.state.user.id}`, query: { controls: true, edit: true } };
    this.context.router.push(path);
  }

  deleteUser() {
    if (this.state.user.id) {
      this.context.userService.deleteUser(this.state.user.id).then((deletedUser) => {
        if (this.props.onUserDelete) this.props.onUserDelete(deletedUser.id);  // call parent's callback
        this.context.router.push({ pathname: `/users`, query: { controls: true } }); //return back to users collection
      });
    }
  }

  render() {

    let isControls = this.state.isControls;
    let isEdit = this.state.isEdit;

    return (
      <div className="user">
        { isEdit ? (
          <h2>{!this.state.user.id ? messages.addNew : messages.edit} {messages.user} </h2>
        ) : null}
        <h3 className="user-email">
          { (isEdit) ? (
            <input type="email" name="email" placeholder="Email here ..." className="form-control"
              value={this.state.user.email} onChange={this.handleTextChange} />
          ) : (
              <span>{this.state.user.email}</span>
            ) }
        </h3>
        <div className="row">
          <table className="metadata table table-bordered table-striped col-xs-12 col-md-6 col-lg-4">
            <tbody>

              <tr>
                <td>{messages.firstName}</td>
                <td>
                  { (isEdit) ? (
                    <input type="text" name="fname" placeholder="User's first name ..." className="form-control"
                      value={this.state.user.fname} onChange={this.handleTextChange} />
                  ) :
                    (
                      <span>{this.state.user.fname}</span>
                    ) }
                </td>
              </tr>

              <tr>
                <td>{messages.lastName}</td>
                <td>
                  { (isEdit) ? (
                    <input type="text" name="lname" placeholder="User's last name ..." className="form-control"
                      value={this.state.user.lname} onChange={this.handleTextChange} />
                  ) :
                    (
                      <span>{this.state.user.lname}</span>
                    ) }
                </td>
              </tr>

              { (isEdit) ? (
                <tr>
                  <td>Password</td>
                  <td>
                    <input type="password" name="password" placeholder="Password ..." className="form-control"
                      value={this.state.user.password} onChange={this.handleTextChange} />
                  </td>
                </tr>
              ) : null }

              { (isEdit) ? (
                <tr>
                  <td>Password Again</td>
                  <td>
                    <input type="password" name="password2" placeholder="Password again ..." className="form-control"
                      value={this.state.user.password2} onChange={this.handleTextChange} />
                  </td>
                </tr>
              ) : null }

             
            </tbody>
          </table>
        </div>

        { isControls ?
          (isEdit ? (
            <div className="user-controls">
              <button type="button" className="btn btn-success" onClick={this.saveChanges}>Save User</button>      
            </div>
          ) : (
              <div className="user-controls">
                <button type="button" className="btn btn-warning" onClick={this.editUser}>Edit User</button>
                <button type="button" className="btn btn-danger" onClick={this.deleteUser}>Delete User</button>
              </div>
            )
          ) : null
        }
        <Modal modalId="user-cancel-confirm" title="Unsaved Edits Confirmation" onConfirm={this.confirmCancelEdit}>
          Your edits have NOT been saved.Are you sure you want to CANCEL without saving them?
        </Modal>
        <Modal modalId="invalid-password" title="Invalid Passsword" onConfirm={this.confirmCancelEdit}>
          Passsword is invalid or doesn't match. It sholud be at least 8 characters: [A-Za-z0-9$%^&*@!]
        </Modal>
      </div>
    );
  }

}

User.propTypes = {
  params: React.PropTypes.object,
  location: React.PropTypes.object,
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    email: React.PropTypes.string.isRequired,
    fname: React.PropTypes.string.isRequired,
    lname: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired
  }),
  isControls: React.PropTypes.bool,
  isEdit: React.PropTypes.bool,
  onUserDelete: React.PropTypes.func,
};

User.contextTypes = {
  userService: React.PropTypes.object,
  router: React.PropTypes.object,
  localeService: React.PropTypes.object
};

User.defaultProps = {
  role: 'student'
};


export default User;

