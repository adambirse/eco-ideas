import React, {Component} from "react";
import {Link} from 'react-router-dom'

class NavBar extends Component {


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
                <ul><Link to='/register'>Register</Link></ul>
            </li>
        } else {
            menu = <li>
                <ul><Link to='/'>Home</Link></ul>
                <ul><Link to='/login'>Login</Link></ul>
                <ul><Link to='/register'>Register</Link></ul>
            </li>
        }
        return menu;
    }
}

export default NavBar;
