import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Select from 'react-select';
import ValidationPanel from "../validation/validationPanel";

const options = [
    { value: 'Home', label: 'Home' },
    { value: 'Work', label: 'Work' }
];

class IdeaForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            toDashboard: false,
            validationErrors: [],
            selectedOption: null,
        };
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    handleSubmit = (e) => {
        this.postIdea(this.text.value, this.state.selectedOption.value);
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


    postIdea = (text, category) => {
        fetch("/api/ideas/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({text: text, category: category})
            })
            .then((res) => {
                console.log(res);

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

        const { selectedOption } = this.state;

        return <form onSubmit={this.handleSubmit}>
            <label>
                Text:
                <input type="text" ref={(value) => this.text = value}/>
            </label>
            <br/>
            <label>
                Category:
                {/*<input type="text" ref={(value) => this.category = value}/>*/}
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                />
            </label>
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