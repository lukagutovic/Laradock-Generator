import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/NavBar/NavBar'

import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Instructions from './pages/Instructions/Instructions'
import NoMatch from './pages/NoMatch/NoMatch'
import Main from './pages/Main/Main'
import Service from './pages/Service/Service'

import "../src/pages/Service/Service.scss";
import "../src/pages/Main/Main.scss";
import "../src/pages/Main/MediaQueryMain.scss"
import "../src/components/CategoryCard/category-card.scss";
import '../src/components/ServiceCard/service-card.scss';
import "../src/pages/Service/MediaQueryService.scss";
import "../src/components/NavBar/Navigation.scss";
import "../src/components/NavBar/MediaQueryNavigation.scss";
import '../src/style/global.scss'
import '../src/components/toggle/toggle-style.scss';
import Container from '@material-ui/core/Container';

import './App.css';



class App extends Component {

  render() {
    return (
      <React.Fragment>
         <Container maxWidth="lg">
        <Router>
          <Navbar />
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/about" component={About} />
              <Route exact path="/instructions" component={Instructions} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/service/:categoryId/:serviceId" component={Service} />
              <Route component={NoMatch} />
            </Switch>
        </Router>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
