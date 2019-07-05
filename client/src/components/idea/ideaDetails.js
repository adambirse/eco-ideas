import React, {Component} from 'react';
import PropTypes from "prop-types";


class IdeaDetails extends Component {

    render = () => {

        return (

            <div className='panel'>
                <h5>Category: {this.props.category}</h5>
                <h5>Details:</h5>
                <p>Some more detail here, lots and lots of text that might be interesting to some people, or maybe
                    not.</p>
            </div>

        );
    }
}

IdeaDetails.propTypes = {
    category: PropTypes.string
};


export default IdeaDetails;