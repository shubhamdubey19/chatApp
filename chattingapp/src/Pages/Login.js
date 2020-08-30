import React ,{ Component } from 'react';
import Header from '../Header/header';
import 'bootstrap/dist/css/bootstrap.min.css';

import appStore from '../Store/AppStore';

import { observer } from 'mobx-react';

import {Redirect} from 'react-router-dom';

class Login extends Component {


  render() {
    return (
      <div>
        <Header />
        {
          appStore.user?(<Redirect to='/home' />):(<Redirect to='/' />)
        }
        
        
      </div>

    );
  }
}

export default observer(Login);
