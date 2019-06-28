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
        console.log('Component did mount');
        this.getList();
    }

    // Retrieves the list of items from the Express app
    getList = () => {
        fetch('/api/getList')
            .then(res => res.json())
            .then(list => this.setState({list}))
    };

    render() {
        const {list} = this.state;

        return (
            <div className="App">
                <h1>List of Items</h1>
                {/* Check to see if any items are found*/}
                {list.length ? (
                    <div>
                        {list.map(i => <Idea key={i.id} text={i.text} categories={i.categories}/>)}
                    </div>
                ) : (
                    <div>
                        <h2>No List Items Found</h2>
                    </div>
                )
                }
            </div>
        );
    }
}

export default IdeaList;