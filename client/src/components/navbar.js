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
            menu = <li>
                <ul><Link to='/'>Home</Link></ul>
                <ul><Link to='/admin'>Admin</Link></ul>
                <ul><Link to='/login'>Login</Link></ul>
                <ul><Link to='/register'>Create Account</Link></ul>
            </li>
        } else {
            menu = <li>
                <ul><Link to='/'>Home</Link></ul>
                <ul><Link to='/login'>Login</Link></ul>
                <ul><Link to='/register'>Create Account</Link></ul>
            </li>
        }
        return menu;
    }
}

const mapStateToProps = state => (
    {
        role: state.menuReducer.role
    });

export default connect(mapStateToProps, null)(NavBar);
