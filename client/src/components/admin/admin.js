import React, {Component} from 'react';
import IdeaForm from "../idea/ideaForm";


class Admin extends Component {

    render() {

        return (
            <div className="App">
                <h1>Admin</h1>
                <IdeaForm/>
            </div>
        );
    }
}

export default Admin;