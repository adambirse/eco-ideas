import React from 'react';
import {Route, Switch} from 'react-router-dom'

import './App.css';
import Header from "./components/header"
import Footer from "./components/footer"
import NavBar from "./components/navbar"
import IdeaList from "./components/idea/ideas";
import Admin from "./components/admin/admin";


function App() {
    return (
        <div className="App">
            <Header/>
            <NavBar/>
            <div className="row">
                <div className="leftcolumn">
                    <Switch>
                        <Route exact path='/' component={IdeaList}/>
                        <Route path='/admin' component={Admin}/>
                        <Route path='/' component={IdeaList}/>

                    </Switch>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
