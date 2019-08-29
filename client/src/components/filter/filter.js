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
        return <div>
            <label>
                Filter:
            </label>
            <input type="text"  value={this.state.value} placeholder={"filter by title"} onChange={this.handleChange} className={"third-width text"}/>
            <input type="submit" value="Filter" onClick={this.filter} className={"tenth-width submit"}/>
            <input type="submit" value="Reset" onClick={this.reset} className={"tenth-width submit"}/>
        </div>;
    }

}

export default Filter;