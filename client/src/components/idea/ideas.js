import React, {Component} from 'react';
import Idea from "./idea";
import Filter from "../filter/filter";
import {get} from "../../api/api";

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

    handleSuccess = (data) => {
        this.setState({
                list: data,
                filteredList: data
            });
    };

    handleError = (error) => {
        console.log(error);
    };

    getList = () => {
        get('ideas', this.handleSuccess, this.handleError);
    };

    render() {
        const {filteredList} = this.state;

        return (
            <div>
                <h2>List of Ideas</h2>
                <Filter handleSearch={this.updateResults} handleReset={this.handleReset}/>
                {filteredList.length ? (
                    <div className={'scrollable'}>
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