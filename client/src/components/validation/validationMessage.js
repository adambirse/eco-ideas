import React from "react";

function ValidationMessage(props) {
    return <div>
        <p>Field {props.message.param} is invalid - {props.message.msg}</p>
    </div>
}

export default ValidationMessage;