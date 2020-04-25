import React, {Component} from 'react';
import Stats from "./pages/Stats/Stats";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import './App.css';


class App extends Component{
  render() {
    return (
        <div className="App">
            <NavBar/>
            <Stats/>
            <Footer/>
        </div>
    );
  }
}

export default App;
