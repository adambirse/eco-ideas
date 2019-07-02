import React from "react";
import { Link } from 'react-router-dom'


function NavBar() {
    return <div className="topnav">
        <Link to='/'>Home</Link>
        <Link to='/admin'>Admin</Link>
    </div>;
}

export default NavBar;
