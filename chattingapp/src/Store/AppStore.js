import { decorate, observable , action , computed } from 'mobx';
class AppStore
{
	
	
	user=null;
	isLoggedIn=false;
	email=""
	nameOfUser=""
	uid=-99999
	groupList=[]
	setUser(user)
	{
		this.user=user;
		this.isLoggedIn=true;
		this.nameOfUser=user.displayName;
		this.email=user.email;
		this.uid=user.uid;
	}

	unsetUser()
	{
		this.user=null;
		this.isLoggedIn=false;
		this.nameOfUser="";
		this.email="";
		this.uid=-99999;
	}
	setGroup(info)
	{
		this.groupList.push(info)
	}

	

	
}
decorate(AppStore,{
	user:observable,
	groupList:observable,
	isLoggedIn:observable,
	setUser:action,
	setGroup:action,
	unsetUser:action

})
const store=new AppStore();
export default store;