import React from "react";

import Idea from "./idea";


function IdeaList(props) {
    return (
        <div>
            {props.ideas.map(i => <Idea key={i.id} text={i.text} categories={i.categories} />)}
        </div>
    );
}

export default IdeaList;