import React from "react";
import {Link} from 'react-router-dom'


function NavBar() {
    return <div className="nav">
        <li>
            <ul><Link to='/'>Home</Link></ul>
            <ul><Link to='/admin'>Admin</Link></ul>
            <ul><Link to='/login'>Login</Link></ul>
            <ul><Link to='/register'>Register</Link></ul>
        </li>
    </div>;
}

export default NavBar;
