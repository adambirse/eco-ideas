import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'

import './App.css';
import Header from "./components/header"
import Footer from "./components/footer"
import NavBar from "./components/navbar"
import IdeaList from "./components/idea/ideas";
import Admin from "./components/admin/admin";
import About from "./components/about/about";
import LoginForm from "./components/user/login";
import RegisterForm from "./components/user/register";

require('dotenv').config();

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Site">
                <Header/>
                <div className="HolyGrail-body">
                    <div className="HolyGrail-content">
                        <Switch>
                            <Route exact path='/' component={IdeaList}/>
                            <Route path='/admin' component={Admin}/>
                            <Route path='/login' component={LoginForm}/>
                            <Route path='/register' component={RegisterForm}/>
                            <Route path='/' component={IdeaList}/>
                        </Switch>
                    </div>
                    <div className="HolyGrail-nav">
                        <NavBar/>
                    </div>
                    <div className="HolyGrail-ads">
                        <About/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
