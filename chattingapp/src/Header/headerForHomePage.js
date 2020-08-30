import React,{ Component } from 'react';
import firebase from 'firebase';
import logo from './whatsapp.png';
import fire from '../Database/fire';

import {Link} from 'react-router-dom'

import { observer } from 'mobx-react';

import appStore from '../Store/AppStore';

import * as remoteActions from '../Scripts/remoteActions'

var db=fire.firestore();
var pathName;
var len;
var gname;
class headerForHomePage extends Component
{
	constructor(props)
	{
		super(props);
		pathName=props.location.pathname
		len=pathName.length
		if(len >7)
		{
			gname=pathName.substr(7)
		}
		console.log(len)

		
	}



	
	
	
	componentDidMount()
	{
		remoteActions.setListenerOnAuthChange();
		
	}
	addGroupOrGroupMembers()
	{
		console.log(this.props);
		//var pathName=this.props.location.pathname;
		//var len=pathName.length
		if(len>7)
		{
			var groupName=pathName.substr(7);
			
			remoteActions.setUserInGroup(groupName)
			
		

		}
		else
		{
			var name=prompt("ENTER NAME OF THE GROUP");
			var l=name.length
			if(l>0)
			{
				remoteActions.setGroupInDatabase(name);

			}
			else
			{
				alert("Invalid Group Name")
			}
			

		}
		
		

	}
	deleteGroup()
	{
		var groupName=prompt("Enter Name of The Group To Be Deleted");
		if(groupName.length>0)
		{
			db.collection('group').doc(groupName).delete().then(() =>{console.log("Deleted")
			}).catch((error) =>{alert('Document Does Not Exists')})



			db.collection("user_group").get().then(function(querySnapshot) {
    		querySnapshot.forEach(function(doc) {
        			var d=doc.data();
        			if(d.groupName===groupName)
        			{
        				db.collection('user_group').doc(doc.id).delete().then(() =>{console.log("deleted")}).catch((error) =>{console.log("")})
        			}
    			});
			});



		}
		else
		{
			alert('Please Enter Valid Group Name')
		}
	}
	
	
	render()
	{
		return(

			<div>
				<nav className="navbar navbar-dark bg-dark">
  					<img src={logo} height='70' width='70' />
  					
  					<form className="form-inline">
  						
  						{
  							len>7?(<Link to={'/home/:'+gname+'/MembersOfGroup'} location={this.props.location} key={this.props.location.key}><font color='green'>Click To View Members</font></Link>)
  							:(<button type="button" className="btn btn-success" onClick={() =>{this.deleteGroup()}}>Delete Group</button>)

  						}
  						
						<font className='text-dark'>&nbsp</font>
						<button type="button" className="btn btn-success" onClick={() =>{this.addGroupOrGroupMembers()}}>+</button>
						<font className='text-dark'>&nbsp</font>
	  					{
	  						appStore.isLoggedIn?(<button type="button" className="btn btn-success" onClick={() =>{remoteActions.signOut()}}>Logout</button>)
	  						:(<button type="button" className="btn btn-success" onClick={() =>{remoteActions.signIn()}}>Login</button>)	
	  					}

	  					
	  					
	  					

	  					
	  					
  					</form>
  				</nav>
  				
  				{
  					appStore.isLoggedIn? null
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
export default observer(headerForHomePage);
 