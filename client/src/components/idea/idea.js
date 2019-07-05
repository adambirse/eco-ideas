import React, {Component} from 'react';
import IdeaDetails from './ideaDetails';


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
                <button className="accordion" onClick={this.expand}><h2>{this.props.id} - {this.props.text}</h2></button>
                {this.getPanel()}
            </div>

        );
    };

    getPanel = () => {

        let panel;
        if (this.state.active) {
            panel = <IdeaDetails text={this.props.text} category={this.props.category}/>
        }
        return panel;
    }

}


export default Idea;