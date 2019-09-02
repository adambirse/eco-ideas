import React, {Component} from 'react';
import Idea from "./idea";
import Filter from "../filter/filter";

const axios = require('axios');

const server = process.env.REACT_APP_SERVER_HOST || 'localhost';
const port = process.env.REACT_APP_SERVER_PORT || 5000;
const serverUrl = `http://${server}:${port}`;

class IdeaList extends Component {
    // Initialize the state
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            filteredList: []
        }
    }

    componentDidMount() {
        this.getList();
    }

    updateResults = (filter) => {
        const filteredResults = this.state.list.filter((i) => {
            return i.title.includes(filter);
        });
        this.setState({
            filteredList: filteredResults
        });
    };

    handleReset = () => {
        this.setState({
            filteredList: this.state.list
        })
    };

    // Retrieves the list of ideas from the Express app
    getList = () => {
        axios.get(serverUrl + '/api/ideas')
            .then(res => res.data)
            .then(list => this.setState({
            list: list,
            filteredList: list
        }))
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const {filteredList} = this.state;

        return (
            <div>
                <h2>List of Ideas</h2>
                <Filter handleSearch={this.updateResults} handleReset={this.handleReset}/>
                {filteredList.length ? (
                    <div>
                        {filteredList.map(i => <Idea key={i.id} id={i.id} title={i.title} text={i.text}/>)}
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