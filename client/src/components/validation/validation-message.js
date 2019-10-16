import React from "react";
import PropTypes from "prop-types";

function ValidationMessage(props) {
    if(props.message) {
        return <div className={"alert"}>
            <p>Field {props.message.param} is invalid - {props.message.msg}</p>
        </div>
    }
    return <div></div>;
}

ValidationMessage.propTypes = {
    message: PropTypes.shape({
        param: PropTypes.string,
        msg: PropTypes.string
    })
};

export default ValidationMessage;