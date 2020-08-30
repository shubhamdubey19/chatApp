import React,{Component} from 'react';

import fire from '../Database/fire';
import {observer} from 'mobx-react';
import Header from '../Header/header';
import logo from '../Header/whatsapp.png'
import {Link} from 'react-router-dom'
var db=fire.firestore();
//var names2=[]
var pathName,i,groupName;
class MembersOfGroup extends Component
{
	
	constructor(props)
	{
		super(props);
		this.state={
			names:[]
		}
		pathName=this.props.location.pathname;
		i=pathName.lastIndexOf("/");
		//var uids=[]
		//var names=[];
		groupName=pathName.slice(7,i);
		
	}
	componentDidMount()
	{
		/*var pathName=this.props.location.pathname;
		var i=pathName.lastIndexOf("/");
		var uids=[]
		var names=[];
		var groupName=pathName.slice(7,i);
		*/
			db.collection('user_group').get().then((querySnapshot) => {
   				querySnapshot.forEach((doc) => {
        			
        			var d=doc.data();
        			if(d.groupName === groupName)
        			{
        				
        				var uid=d.uid;
        				
        				db.collection('users').get().then((querySnapshot2) => {
   							querySnapshot2.forEach((doc2) => {
        			
        						var d=doc2.data();
        						console.log(doc2.id)
        						if(doc2.id === uid)
        						{
        				
        							this.setState({
        								names:[...this.state.names,d.name]
        							})

        						}		
       				
    						});

						});

        			}		
       				
    			});

			});
		
		
		

	}
	render()
	{

		return(
			<div>
				<nav className="navbar navbar-dark bg-dark">
  					<img src={logo} height='70' width='70' />
  				</nav>

				{
					this.state.names.map((m,i) =>{
						return(
							<p key={i}>{m}</p>
							)
						

					})

				}
				<Link to={'/home/:'+groupName} ><font color='green'>Click To Go Back To Chat</font></Link>
			</div>
			)
	}
}
export default (MembersOfGroup);

