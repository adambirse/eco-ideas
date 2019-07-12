import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import ValidationPanel from "../validation/validationPanel";

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

    handleServerError(res) {

        res.json().then((body) => {
            this.setState(() => ({
                validationErrors: body.errors,
            }));
        })
    }


    postIdea = (title, text) => {
        fetch(serverUrl + "/api/ideas/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({title: title, text: text})
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
                Title:
            </label>
            <input type="text" ref={(value) => this.title = value} size={50}/>
            <label>
                Text:
            </label>
            <textarea value={this.state.text} onChange={this.handleChange} rows={5}></textarea>
            <input type="submit" value="Submit"/>
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

export default IdeaForm;