import {decorate,observable,action} from 'mobx';

class GroupStore
{
	messages=[]
	groupName=""
	

	setGroup(groupName,...messages)
	{
		this.groupName=groupName;

		//this.messages=[...messages];
		this.messages=messages.slice()
	}
	setGroupWithNewMessage(groupName,newMessage,author)
	{
		this.groupName=groupName;
		this.message=[...this.messages,newMessage]
		
	}
	unsetGroup()
	{
		this.messages=[]
		this.groupName=""
	}
}
decorate(GroupStore,{
	messages:observable,
	groupName:observable,
	setGroup:action,
	unsetGroup:action,
	setGroupWithNewMessage:action
})

const groupStore=new GroupStore();

export default groupStore;