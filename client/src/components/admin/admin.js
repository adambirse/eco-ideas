import React, {Component} from 'react';
import IdeaForm from "../idea/ideaForm";


class Admin extends Component {

    render() {

        return (
            <div className="App">
                <h3>Admin</h3>
                <IdeaForm/>
            </div>
        );
    }
}

export default Admin;