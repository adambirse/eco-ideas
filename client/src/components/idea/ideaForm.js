import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import ValidationPanel from "../validation/validation-panel";
import ErrorMessage from "../error/error-message";
import {securePost} from "../../api/api";

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

    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await this.postIdea(this.title.value, this.state.text);
            this.handleSuccess();
        } catch (exception) {
            this.handleServerError(exception.response);
        }
    };

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
        } else if (response.status === 401) {
            this.setState(() => ({
                error: response.data
            }));
        } else {
            console.log(response);
            this.setState(() => ({
                error: response.data
            }));
        }
    };

    postIdea = async (title, text) => {
        await securePost({title: title, text: text}, "ideas", this.handleSuccess, this.handleServerError);
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
            <label htmlFor={"title"}>Title:</label>
            <input type="text" ref={(value) => this.title = value} size={50} className={"text"} id={"title"}
                   placeholder={'title'}/>
            <label htmlFor={"text"}>Text:</label>
            <textarea value={this.state.text} onChange={this.handleChange} rows={5} id={"text"} placeholder={'text'}/>
            <input type="submit" value="submit" className={"submit"}/>
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