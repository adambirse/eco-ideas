import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import ErrorMessage from "../error/error-message";
import {securePost} from "../../api/api";
import {connect} from "react-redux";
import addRole from "../../actions/actions";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email_address: '',
            password: '',
            toDashboard: false,
            error: '',
        };
    }

    clearErrors = () => {
        this.setState(() => ({
            error: ''
        }));
    };

    handleEmailChange = e => {
        this.setState({email_address: e.target.value});
    };

    handlePasswordChange = e => {
        this.setState({password: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.clearErrors();
        this.login(this.state.email_address, this.state.password);
    };

    handleSuccess = () => {
        this.props.addRole("admin");
        this.setState(() => ({
            toDashboard: true
        }));
    };

    handleServerError = (response) => {
        this.setState(() => ({
            error: response.data.error
        }));
    };

    login = async (email_address, password) => {

        try {
            await securePost({
                email_address: email_address,
                password: password
            }, "authenticate");
            this.handleSuccess();
        } catch (exception) {
            this.handleServerError(exception.response);
        }
    };

    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                {this.errorPanel()}
                {this.getForm()}
            </div>
        );
    }

    getForm() {
        return <form onSubmit={this.handleSubmit}>
            <label htmlFor={"email"}>Email:</label>
            <input id="email" type="text" value={this.state.email_address} onChange={this.handleEmailChange}
                   className={"text"}/>
            <label htmlFor={"password"}>Password:</label>
            <input id="password" type="password" value={this.state.password} onChange={this.handlePasswordChange}
                   className={"text"}/>
            <input value="submit" type="submit" className={"submit"}/>
        </form>;
    }

    errorPanel() {
        let error;
        if (this.state.error !== "") {
            error = <ErrorMessage error={this.state.error}/>
        }
        return error;
    }
}

const mapDispatchToProps = dispatch => ({
    addRole: (payload) => dispatch(addRole(payload))
});

export default connect(null, mapDispatchToProps)(LoginForm);