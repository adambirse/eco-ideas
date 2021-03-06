import React, {Component} from 'react';

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    filter = () => {
        this.props.handleSearch(this.state.value);
    };

    reset = () => {
        this.setState({value: ''});
        this.props.handleReset();
    };

    render() {
        return <div role = "search">
                <label htmlFor="search">Filter:</label>
                <input id="search" type="text" value={this.state.value} placeholder={"filter by title"}
                       onChange={this.handleChange} className={"third-width text"}/>
                <input type="submit" name='submit' value="Filter" onClick={this.filter}
                       className={"tenth-width submit"}/>
                <input type="submit" name='reset' value="Reset" onClick={this.reset} className={"tenth-width submit"}/>
        </div>;
    }

}

export default Filter;