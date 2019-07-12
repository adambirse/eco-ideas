import React, {Component} from 'react';
import Idea from "./idea";

const server = process.env.REACT_APP_SERVER_HOST || 'localhost';
const port = process.env.REACT_APP_SERVER_PORT || 5000;
const serverUrl = `http://${server}:${port}`;

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
        fetch(serverUrl + '/api/ideas')
            .then(res => res.json())
            .then(list => this.setState({list}))
    };

    render() {
        const {list} = this.state;

        return (
            <div className="App">
                <h1>List of Ideas</h1>
                {list.length ? (
                    <div>
                        {list.map(i => <Idea key={i.id} id={i.id} title={i.title} text={i.text}/>)}
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