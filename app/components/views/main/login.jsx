'use strict';

import React from "react";

export default class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            fname: '',
            password: ''
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({fname: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let fname = this.state.fname.trim();
        let password = this.state.password.trim();

        if (!fname || !password) {
            return;
        }

        this.context.userService.loginUser({fname: fname, password: password}).then(
            (result) => {
                console.log(result);
                sessionStorage['isLogged'] = result.fname;
                this.context.router.push({ pathname: `/home`});
            });

        this.setState({
            password: '',
        });
    }

    render() {
        return (
            <form className="col-md-6 text-center">
                <h2>Login</h2>

                <div className="form-group">
                    <label className="control-label" htmlFor="username">Username </label>
                    <input className="input-sm form-control" type="text" value={this.state.fname} id="username"
                           onChange={this.handleUsernameChange}/>
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="password">Password </label>
                    <input className="input-sm form-control" type="password" value={this.state.password} id="password"
                           onChange={this.handlePasswordChange}/>
                </div>
                <input className="input-sm form-control" type="submit" value="Login" id="submit"
                       onClick={this.handleSubmit}/>
            </form>
        );
    }
}

Login.contextTypes = {
  userService: React.PropTypes.object,
  router: React.PropTypes.object,
  localeService: React.PropTypes.object
};

