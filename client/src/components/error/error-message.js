import React from "react";

function ErrorMessage(props) {
    return <div className={"alert"}>
        <p>{props.error}</p>
    </div>
}

export default ErrorMessage;