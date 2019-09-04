import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import ErrorMessage from "../error/ErrorMessage";

const server = process.env.REACT_APP_SERVER_HOST || 'localhost';
const port = process.env.REACT_APP_SERVER_PORT || 5000;
const serverUrl = `http://${server}:${port}`;
const axios = require('axios');

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

    handleEmailChange = e => {
        this.setState({email_address: e.target.value});
    };

    handlePasswordChange = e => {
        this.setState({password: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.login(this.state.email_address, this.state.password);
    };

    handleSuccess() {
        this.setState(() => ({
            toDashboard: true
        }));
    }

    handleServerError(response) {
        this.setState(() => ({
            error: response.data.error
        }));
    }

    login = (email_address, password) => {
        axios.post(serverUrl + "/api/authenticate/",
            {
                email_address: email_address,
                password: password
            }, {
                withCredentials: true
            })
            .then((res) => {
                this.handleSuccess();
            })
            .catch((error) => {
                this.handleServerError(error.response);
            })
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
            <label>
                Email:
            </label>
            <input type="text" value={this.state.email_address} onChange={this.handleEmailChange}
                   className={"text"}/>
            <label>
                Password:
            </label>
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange}
                   className={"text"}/>
            <input type="submit" value="Submit" className={"submit"}/>
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

export default LoginForm;