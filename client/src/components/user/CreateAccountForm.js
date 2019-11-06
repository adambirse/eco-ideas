import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import ErrorMessage from "../error/error-message";
import ValidationPanel from "../validation/validation-panel";
import {securePost} from "../../api/api";

class CreateAccountForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email_address: '',
            password: '',
            toDashboard: false,
            error: '',
            validationErrors: []
        };
    }

    handleEmailChange = e => {
        this.setState({email_address: e.target.value});
    };

    handlePasswordChange = e => {
        this.setState({password: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.clearErrors();
        const { hash } = this.props.match.params;
        this.register(this.state.email_address, this.state.password, hash);
    };

    clearErrors() {
        this.setState(() => ({
            validationErrors: [],
            error: ''
        }));
    }

    handleSuccess = () => {
        this.setState(() => ({
            toDashboard: true
        }));
    };

    handleServerError = (response) => {
        if (response.status === 422) {
            this.setState(() => ({
                validationErrors: response.data.errors,
            }));
        } else {
            this.setState(() => ({
                error: response.data
            }));
        }
    };

    register = async (email_address, password, invite_hash) => {
        try {
            await securePost({
                email_address: email_address,
                password: password,
                invite_hash: invite_hash

            }, "create-account/");
            this.handleSuccess();
        } catch (e) {
            console.log(e);
            this.handleServerError(e.response);

        }
    };

    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                {this.errorPanel()}
                {this.optionalValidation()}
                {this.getForm()}
            </div>
        );
    }

    getForm() {
        return <form onSubmit={this.handleSubmit}>
            <label htmlFor={"email"}>Email:</label>
            <input id="email" type="text" value={this.state.email_address} onChange={this.handleEmailChange}
                   className={"text"} placeholder={"email"}/>
            <label htmlFor={"password"}>Password:</label>
            <input id="password" type="password" value={this.state.password} onChange={this.handlePasswordChange}
                   className={"text"} placeholder={"password"}/>
            <input type="submit" name="submit" value="submit" className={"submit"}/>
        </form>;
    }

    optionalValidation() {
        let validation;
        if (this.state.validationErrors.length !== 0) {
            validation = <ValidationPanel messages={this.state.validationErrors}/>
        }
        return validation;
    }

    errorPanel() {
        let error;
        if (this.state.error !== "") {
            error = <ErrorMessage error={this.state.error}/>
        }
        return error;
    }
}

export default CreateAccountForm;