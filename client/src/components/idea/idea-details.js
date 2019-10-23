import React, {Component} from 'react';
import PropTypes from "prop-types";


class IdeaDetails extends Component {

    render = () => {
        return (
            <div className='panel'>
                <h5>Details:</h5>
                <p>{this.props.text}</p>
            </div>
        );
    }
}

IdeaDetails.propTypes = {
    text: PropTypes.string
};

export default IdeaDetails;