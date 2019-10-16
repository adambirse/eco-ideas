import React, {Component} from 'react';
import ValidationMessage from "./validation-message";

class ValidationPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: props.messages
        }
    }

    render() {
        const {messages} = this.state;

        if (messages) {
            return (
                <div>
                    {messages.map((message) => <ValidationMessage key={message.param} message={message}/>)}
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

export default ValidationPanel;