import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {connect} from "react-redux";

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.props = {
            role: '',
        };
    }

    render() {
        return <div className="nav">
            {this.menu()}
        </div>;
    }

    menu() {
        let menu;
        if (this.props.role === "admin") {
            menu = <div>
                <Link to='/'>Home</Link>
                <Link to='/admin'>Admin</Link>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </div>
        } else {
            menu = <div>
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </div>
        }
        return menu;
    }
}

const mapStateToProps = state => (
    {
        role: state.menuReducer.role
    });

export default connect(mapStateToProps, null)(NavBar);
