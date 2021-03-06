import React, {Component} from 'react';
import IdeaDetails from './idea-details';
import PropTypes from 'prop-types';

class Idea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }


    expand = (e) => {
        e.preventDefault();
        this.setState({active: !this.state.active});
    };

    render = () => {

        return (

            <div className='card'>
                <button className="accordion" onClick={this.expand}><h3>{this.props.title}</h3></button>
                {this.getPanel()}
            </div>

        );
    };

    getPanel = () => {

        let panel;
        if (this.state.active) {
            panel = <IdeaDetails text={this.props.text}/>
        }
        return panel;
    }
}

Idea.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string,
    title: PropTypes.string
};


export default Idea;