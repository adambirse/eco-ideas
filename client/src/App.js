import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'

import './App.css';
import Header from "./components/header"
import Footer from "./components/footer"
import NavBar from "./components/navbar"
import IdeaList from "./components/idea/ideas";
import Admin from "./components/admin/admin";
import About from "./components/about/about";
import LoginForm from "./components/user/LoginForm";
import RegisterForm from "./components/user/RegisterForm";
import CreateAccountForm from "./components/user/CreateAccountForm";

require('dotenv').config();

class App extends Component {
    
    render() {
        return (
            <div className="Site">
                <Header/>
                <div className="HolyGrail-body">
                    <div role="main" className="HolyGrail-content">
                        <Switch>
                            <Route exact path='/' component={IdeaList}/>
                            <Route path='/admin' component={Admin}/>
                            <Route path='/login' component={LoginForm}/>
                            <Route path='/register' component={RegisterForm}/>
                            <Route path='/create-account/:hash' component={CreateAccountForm}/>
                        </Switch>
                    </div>
                    <div role="navigation" className="HolyGrail-nav">
                        <NavBar/>
                    </div>
                    <div role="complementary" className="HolyGrail-ads">
                        <About/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
