import React from "react";

require('dotenv').config();
const imgUrl = process.env.PUBLIC_URL + 'green-leaves.jpg';

function Header() {

    return <div className = 'header'
                style = {{ backgroundImage: 'url(' + imgUrl + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                }}>
        <h1>Eco Ideas</h1>
    </div>;
}


export default Header;