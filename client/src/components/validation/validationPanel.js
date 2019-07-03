import React, {Component} from 'react';
import ValidationMessage from "./validationMessage";


class ValidationPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: props.messages
        }
    }

    render() {
        const {messages} = this.state;

        return (
            <div>
                {this.state.messages.map((message) => <ValidationMessage message={message}/>)}

            </div>
        );
    }
}

export default ValidationPanel;