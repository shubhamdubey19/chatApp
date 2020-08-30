
import firebase from 'firebase';
import fire from '../Database/fire';
import appStore from '../Store/AppStore';

var i=1;

var db=fire.firestore();
export function signIn()
	{
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		.then(() =>{
			signInHelper();
		})
		
	}
export function signInHelper()
	{
		var provider=new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).
		then((result)=> {
		  		
		  //var token = result.credential.accessToken;
		  
		  var user = result.user;
		  console.log(user);
		  
		}).catch((error)=> {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(errorMessage);
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});


	}
export function signOut()
	{
		firebase.auth().signOut().then(() => {
			console.log('signed out')
			
		  // Sign-out successful.
		}).catch((error) => {
  		// An error happened.
		});
	}




export function setListenerOnAuthChange()
{
	firebase.auth().onAuthStateChanged((user) => {
			if (user) {
			    appStore.setUser(user);
			    
			    
			} else {
			    appStore.unsetUser();
			}
			
		});
}

export function setUserInDatabase()
{
	var uid=appStore.uid;

	db.collection('users').doc(uid).set({
		name:appStore.nameOfUser,
		email:appStore.email
	})
	

}
export function setGroupInDatabase(groupName)
{
	var currUid=appStore.uid;
	
	db.collection('user_group').doc().set({
		uid:currUid,
		groupName:groupName

	})
	

	db.collection('group').doc(groupName).set({
		messages:[]
	})

	


}

export function setUserInGroup(groupName)
{
	var email=prompt("Enter the email id of the person whom you want to add in the group")
	var uid,name;
	var notFound=false;
	//const foundOnce;
	var notAtAllFound=true;
	db.collection('users').get().then(function(querySnapshot) {
    	querySnapshot.forEach(function(doc) {
        	
        	var mail=doc.data().email;
        	console.log(email)
        	console.log(mail)
        	if(mail===email)
        	{
        		const foundOnce=true;
        		if(foundOnce===true)
        		{
        			notAtAllFound=false
        		}
        		

        		uid=doc.id;
        		name=doc.data().name;
        		db.collection('user_group').doc().set({
    				uid:uid,
    				groupName:groupName

    			})


        	}
        	else
        	{
        		notFound=true;
        	}
        	

        	
    	});
    	if(notAtAllFound===true && notFound===true )
    	{
    		alert("Invalid Name")
    	}
    });
       
}
