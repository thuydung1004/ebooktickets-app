import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Service';
import Single from './pages/Single';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Header from'./components/Header';
import Footer from'./components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import DangKi from './pages/DangKi';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Service from './pages/Service';
import ProductScreen from './screens/ProductScreen';
import PaymentScreen from './screens/PaymentScreen';
import React, { Component } from "react";
import BusesArrScreen from './screens/BusesArrScreen';
import OrderTicketScreen from './screens/OrderTicketScreen';


function App() {
  return (
    <div>
      <Router>

        <Header/>

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/service' component={Service} />
            <Route path='/single' component={Single} />
            <Route path='/gallery' component={Gallery} />
            <Route path='/contact' component={Contact} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />

            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/ticket/:id/' component={OrderTicketScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/busarrangements/:id' component={BusesArrScreen}/>
          </Switch>

        <Footer/>

      </Router>
    </div>
    
  );
}

export default App;
