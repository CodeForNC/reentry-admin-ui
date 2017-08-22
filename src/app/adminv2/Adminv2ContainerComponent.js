import React, { Component } from 'react';
import ResourceList from './ResourceList';
import ResourceDetail from './ResourceDetail';
import CreateForm from './CreateForm';


const LOCAL_STORAGE_KEY = 'resources';


//stores resources in an array in the app state
class Adminv2ContainerComponent extends Component {
	constructor() {
		super();

//we get the locol storage data out with a getItem function and put it in aconstant here.
const localStorageResources = window.localStorage.getItem(LOCAL_STORAGE_KEY);		

		this.state = {
			showCreate: false,
			//Checks to see if we have data in localStorage and if there is is parses to an array of objects. This is the array property in the app state that stores the resources
			resources: localStorageResources ? JSON.parse(localStorageResources) : [], 
			selectedResource: null //A new state property is added here to keep track of selected resource
		};
	}
//This is a method with a booolean to show the form...is the button's onClick handler
 showCreate() {
 	this.setState({ showCreate: true });
 }

 //This is the event handler for the onSubmit prop
 //This handleCreateResource method adds the name, specifics and resource to the resources array in the app state
 handleCreateResource(name, specifics, pairs) {
 	
//using the concat method of this.state.resources to not mutate the state directly but to create a new array with the resource object added to the end
 	const newResources = this.state.resources.concat({ 
 		
 		 id: new Date().getTime(),
 		 name,
 		 specifics,
 		 pairs
 	});

 this.updateResources(newResources);
 }

 handleSelectResource(resource) {
 	this.setState({
 		selectedResource: resource,
 		showCreate: false
 	});
 }

 //Adding function to delete the resource and pass it in as the onDelete callback. 
 //Not mutating the component state by using the filter method
 handleDeleteResource(resourceToDelete) {
 	const newResources = this.state.resources.filter(resource => resource !== resourceToDelete);
 	 this.updateResources(newResources);

 	 this.setState({
 	 	selectedResource: null
 	 });
 }

updateResources(newResources) {
	this.setState({
		resources: newResources
	});

	window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newResources));
}	
	render() {
		
		return (
			
			<div className='container'>
			<h1>Hi, I'm the Adminv2ContainerComponent Component</h1>
			
			

			 <div className='row'>
			   <div className='col-xs-4'>
			   <button 
			   type='button'
			   className='btn btn-primary'
			   style={{
			   	width: '100%',
			   	marginBottom: '5px'
			   }}
			   onClick={this.showCreate.bind(this)}
			   >
			   Create new resource
			   </button>
			   <ResourceList resources={this.state.resources} 
							 onSelectResource={this.handleSelectResource.bind(this)}			   														


			   /> 
			   </div>
			   <div className='col-xs-8'>
			  { this.state.showCreate 
			  	? <CreateForm onSubmit={this.handleCreateResource.bind(this)}/> 
			  	: <ResourceDetail resource={this.state.selectedResource}
			  	                  onDelete={this.handleDeleteResource.bind(this)} 
			  	                  /> } 
			   </div>

			
             </div>

		</div>
			
			);
	}
}





export default Adminv2ContainerComponent;