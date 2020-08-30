import React,{ Component } from 'react';
import firebase from 'firebase';
import logo from './whatsapp.png';
import fire from '../Database/fire';

import { observer } from 'mobx-react';

import appStore from '../Store/AppStore';

import * as remoteActions from '../Scripts/remoteActions'

var db=fire.firestore();

class header extends Component
{
	
	
	componentDidMount()
	{
		remoteActions.setListenerOnAuthChange();

	}
	
	render()
	{
		return(

			<div>
				<nav className="navbar navbar-dark bg-dark">
  					<img src={logo} height='70' width='70' />
  					{
  						appStore.isLoggedIn?(<button type="button" className="btn btn-success" onClick={() =>{remoteActions.signOut()}}>Logout</button>)
  						:(<button type="button" className="btn btn-success" onClick={() =>{remoteActions.signIn()}}>Login</button>)	
  					}
  					
  				</nav>
  				<br />
  				<br />
  				<br />
  				{
  					appStore.isLoggedIn? (remoteActions.setUserInDatabase())
  					:(
  						<div>
	  						<center>	
	  						<h2 className='text-success'>Welcome To Whatsapp Messenger</h2>	
	  						<br />
	  						<h2 className='text-success'>Click On Login Button</h2>
	  						<br />
	  						<h2 className='text-success'>To Login via Google</h2>
	  						</center>
	  						</div> )
  						
  				}
  					
			</div>


			)

	}
}
export default observer(header);