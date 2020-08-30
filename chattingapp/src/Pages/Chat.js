import React,{ Component } from 'react';
import {Link,Redirect} from 'react-router-dom';
import appStore from '../Store/AppStore';
import firebase from 'firebase';

//import Send from '../MessageComponent/chatComponent'
//import groupStore from '../Store/GroupStore'
import fire from '../Database/fire'
import {observer} from  'mobx-react';
import Header from '../Header/headerForHomePage';

var db=fire.firestore();
class chat extends Component
{
	constructor(props)
	{
		super(props);
		this.state={
			messages:[],
			newMessage:""

		}
		console.log(appStore.user)
	}
	componentDidMount()
	{
		var pathName=this.props.location.pathname;
		var groupName=pathName.substr(7);
		const messages=[]
		var i=0;
		
		db.collection('group').doc(groupName).onSnapshot((doc) =>{
			var m=doc.data().messages
			console.log(m)
			try{
				while(m[i]!=null)
				{	
					messages.push({
						message:m[i].message,
						author:m[i].author
					})
					i++
				}

			}
			catch(err)
			{}
			

		})//catch((error) =>{})
		this.setState({messages})

	}
	sendMessage()
	{
		var pathName=this.props.location.pathname;
		var groupName=pathName.substr(7);
		var currUser=appStore.nameOfUser;

		db.collection('group').doc(groupName).update({
			messages:firebase.firestore.FieldValue.arrayUnion({message:this.state.newMessage,author:currUser})
		})
		
		this.setState({
			newMessage:""
		})




	}
	
	render()
	{
		return(

			<div>
				<Header location={this.props.location} key={this.props.location.key} />
				{
					this.state.messages.map((m,i) =>{
						return(
							<p key={i}>{m.author}:{m.message}</p>
							)
					})
				}
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />

			
				<div className="input-group" >
	  				<textarea className="form-control" aria-label="With textarea" value={this.state.newMessage}
	  				onChange={(e) =>{
	  					this.setState({
	  						newMessage:e.target.value
	  					})
	  				}} id='message'></textarea>
	  				<div class="input-group-append">
	    				<button type="button" className="btn btn-outline-success" onClick={()=>{this.sendMessage()}}>Send</button>
	  				</div>
				</div>
					
			
				<Link to ='/home'><font color='green'>Back to Home Page</font></Link>
				{
					(appStore.isLoggedIn)?null:(<Redirect to='/' />)
				}


			</div>
			)
	}

}


export default observer(chat)
