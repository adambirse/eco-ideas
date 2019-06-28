import React from 'react';
import './App.css';
import Header from "./components/header"
import Footer from "./components/footer"
import NavBar from "./components/navbar"
import IdeaList from "./components/idea/ideas";


function App() {
    return (
        <div className="App">
            <Header/>
            <NavBar/>
            <div className="row">
                <div className="leftcolumn">
                    <IdeaList/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
