import React from "react";

function Idea(props) {
    return <div className="card">
        <h2>{props.text}</h2>
        <h5>{props.category}</h5>
        <p>Some more detail here, lots and lots of text that might be interesting to some people, or maybe not.</p>
    </div>
}

export default Idea;