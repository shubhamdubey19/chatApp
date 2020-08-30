import React,{ Component } from 'react';
import appStore from '../Store/AppStore';

import {observer} from 'mobx-react';
import 'bootstrap/dist/css/bootstrap.min.css';

import fire from '../Database/fire';

import {Link,Redirect} from 'react-router-dom';
import Header from '../Header/headerForHomePage';

var db=fire.firestore();

class home extends Component
{
	state={
		groupName:[]

	}
	
	componentDidMount()
	{

		var isLoggedIn=appStore.isLoggedIn;
		var groupName=[];
		if(isLoggedIn)
		{
			var uid=appStore.uid;

			db.collection('user_group').onSnapshot((querySnapshot) => {
   				querySnapshot.forEach((doc) => {
        			
        			var d=doc.data();
        			if(d.uid === uid)
        			{
        				if((this.state.groupName).includes(d.groupName)===false)
        				this.setState({
        					groupName:[...this.state.groupName,d.groupName]
        				})
        			else
        				this.setState({
        					groupName:[...this.state.groupName]
        				})

        			}		
       				
    			});

			});
			/*db.collection("cities").where("state", "==", "CA")
    			.onSnapshot(function(querySnapshot) {
        	var cities = [];
        querySnapshot.forEach(function(doc) {
            cities.push(doc.data().name);
        });
        console.log("Current cities in CA: ", cities.join(", "));
    });*/
			/*var i=0;
			db.collection('user_group').doc(uid).get().then((doc) =>{
				var m=doc.data();
				while(m[i]!=null)
				{
					groupName.push(m[i])

				}

			})
			console.log(groupName)
			//this.setState({groupName}) */
		

		}



		

	}


	render()
	{
		return(

			<div>
				<Header location={this.props.location} key={this.props.location.key}/>

				
				{
					this.state.groupName.map((m,i) =>{
						var l='/home/:'+m
						return(
							<div className='bg-light text-dark'>
								<Link to={l} location={this.props.location} key={this.props.location.key}><font size='5' color='green'>{m}</font></Link>
								<br />
								<hr />
							</div>
							)
					})
				}
				
				<Link to='/profile'><font color='green'>View Your Profile</font></Link>
				{
					(appStore.isLoggedIn)?null:(<Redirect to='/' />)
				}


			</div>
			)
	}

}
export default observer(home);