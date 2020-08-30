import React,{ Component } from 'react';
import appStore from '../Store/AppStore';

import fire from '../Database/fire'

import {Link,Redirect} from 'react-router-dom';
import {observer} from  'mobx-react';

import Header from '../Header/header';
 class profile extends Component
{
	render()
	{
		return(

			<div>
				<Header />
				{
					appStore.isLoggedIn?(
						<center>
							<img style={styles.profile} src={appStore.user.photoURL} />
							<p><b>{appStore.nameOfUser}</b></p>
							<p><b>{appStore.email}</b></p>
						</center>)
					:null
				}
				<br />


				<Link to ='/home'>Back to Home</Link>
				{
					(appStore.isLoggedIn)?null:(<Redirect to='/' />)
				}

			</div>
			)
	}

}
const styles={
	profile:{
		height:200,
		width:200,
		margin:20,
		borderRadius:100
	}
}
export default profile;