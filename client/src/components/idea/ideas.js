import React, {Component} from 'react';
import Idea from "./idea";


class IdeaList extends Component {
    // Initialize the state
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    // Fetch the list on first mount
    componentDidMount() {
        this.getList();
    }

    // Retrieves the list of ideas from the Express app
    getList = () => {
        fetch('/api/ideas')
            .then(res => res.json())
            .then(list => this.setState({list}))
    };

    render() {
        const {list} = this.state;

        return (
            <div className="App">
                <h1>List of Ideas</h1>
                {/* Check to see if any items are found*/}
                {list.length ? (
                    <div>
                        {list.map(i => <Idea id={i.id} text={i.text} category={i.category}/>)}
                    </div>
                ) : (
                    <div>
                        <h2>No Ideas Found</h2>
                    </div>
                )
                }
            </div>
        );
    }
}

export default IdeaList;