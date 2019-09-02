import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import ValidationPanel from "../validation/validationPanel";

const server = process.env.REACT_APP_SERVER_HOST || 'localhost';
const port = process.env.REACT_APP_SERVER_PORT || 5000;
const serverUrl = `http://${server}:${port}`;

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email_address: '',
            password: '',
            toDashboard: false,
            validationErrors: [],
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
        console.log(this.state.email_address);
        console.log(this.state.password);
        this.login(this.state.email_address, this.state.password);
    };

    handleSuccess() {
        this.setState(() => ({
            toDashboard: true
        }));
    }

    handleServerError(res) {

        res.json().then((body) => {
            this.setState(() => ({
                validationErrors: body.errors,
            }));
        })
    }

    login = (email_address, password) => {
        fetch(serverUrl + "/api/authenticate/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                credentials: 'include',
                body: JSON.stringify({email_address: email_address, password: password})
            })
            .then((res) => {
                if (res.status === 200) {
                    this.handleSuccess();
                } else {
                    this.handleServerError(res);
                }
            })
            .catch((res) => {
                console.log(res)
            })
    };

    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                {this.optionalValidation()}
                {this.getForm()}
            </div>
        );
    }

    getForm() {
        return <form onSubmit={this.handleSubmit}>
            <label>
                Email:
            </label>
            <input type="text" value={this.state.email_address} onChange={this.handleEmailChange} className={"text"}></input>
            <label>
                Password:
            </label>
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className={"text"}></input>
            <input type="submit" value="Submit" className={"submit"}/>
        </form>;
    }

    optionalValidation() {
        let validation;
        if (this.state.validationErrors.length !== 0) {
            validation = <ValidationPanel messages={this.state.validationErrors}/>
        }
        return validation;
    }
}

export default LoginForm;