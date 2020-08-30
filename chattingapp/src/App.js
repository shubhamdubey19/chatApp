import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Pages/Login';
import Home from './Pages/Home';
import Chat from './Pages/Chat';
import Profile from './Pages/Profile';
import Members from './Pages/MembersOfGroup';

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

class App extends Component {


  render() {
    return (
      <div>
        
        <Router>
        	<Switch>
            <Route exact path='/' component={Login} />
        		<Route exact path='/home' component={Home} />
        		<Route exact path='/home/:groupName' component={Chat} />
        		<Route exact path='/profile' component={Profile} />
            <Route exact path='/home/:groupName/MembersOfGroup' component={Members} />
            
        	</Switch>

        </Router>
        
        

      </div>
    );
  }
}

export default App;
