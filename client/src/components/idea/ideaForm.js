import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import ValidationPanel from "../validation/validationPanel";
import ErrorMessage from "../error/ErrorMessage";

const axios = require('axios');

const server = process.env.REACT_APP_SERVER_HOST || 'localhost';
const port = process.env.REACT_APP_SERVER_PORT || 5000;
const serverUrl = `http://${server}:${port}`;

class IdeaForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            toDashboard: false,
            validationErrors: [],
            text: '',
            error: '',
        };
    }

    handleChange = e => {
        this.setState({text: e.target.value});
    };

    handleSubmit = (e) => {
        this.postIdea(this.title.value, this.state.text);
        e.preventDefault();
    };

    handleSuccess() {
        this.setState(() => ({
            toDashboard: true
        }));
    }

    handleServerError(response) {
        if (response.status === 422) {
            this.setState(() => ({
                validationErrors: response.data.errors,
            }));
        } else if (response.status === 401) {
            this.setState(() => ({
                error: response.data
            }));
        } else {
            console.log(response);
        }
    }

    postIdea = (title, text) => {
        axios.post(serverUrl + "/api/ideas/",
            {
                title: title,
                text: text
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
                {this.optionalValidation()}
                {this.errorPanel()}
                {this.getForm()}
            </div>
        );
    }

    getForm() {
        return <form onSubmit={this.handleSubmit}>
            <label>
                Title:
            </label>
            <input type="text" ref={(value) => this.title = value} size={50} className={"text"}/>
            <label>
                Text:
            </label>
            <textarea value={this.state.text} onChange={this.handleChange} rows={5}/>
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

    errorPanel() {
        let error;
        if (this.state.error !== "") {
            error = <ErrorMessage error={this.state.error}/>
        }
        return error;
    }
}

export default IdeaForm;