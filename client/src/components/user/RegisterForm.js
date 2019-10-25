import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import ErrorMessage from "../error/error-message";
import ValidationPanel from "../validation/validation-panel";
import {post} from "../../api/api";

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email_address: '',
            toDashboard: false,
            error: '',
            validationErrors: []
        };
    }

    handleEmailChange = e => {
        this.setState({email_address: e.target.value});
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.clearErrors();
        try {
            await this.register(this.state.email_address);
            this.handleSuccess();
        } catch (exception) {
            this.handleServerError(exception.response);
        }
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

    register = async (email_address) => {
        return await post({
            email_address: email_address
        }, "register/");
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
                   className={"text"}/>
            <input value="submit" type="submit" className={"submit"}/>
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

export default RegisterForm;