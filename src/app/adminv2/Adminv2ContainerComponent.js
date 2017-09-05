import React, { Component } from 'react';
import ResourceList from './ResourceList';
import ResourceDetail from './ResourceDetail';
import CreateForm from './CreateForm';
import SearchBox from './SearchBox';


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
			//A new state property is added here to keep track of selected resource
			selectedResource: null,
			//added search property to state a empty string as we want to show all results initially
			search: ''

		};
	}
//This is a method with a booolean to show the form...is the button's onClick handler
 showCreate() {
 	this.setState({ showCreate: true });
 }

 //This is the event handler for the onSubmit prop that handles the creation on the new resource
 //This handleCreateResource method adds the name, specifics and resource to the resources array in the app state using the arrays concat method
 handleCreateResource(name, specifics, pairs) {
 	
//using the concat method of this.state.resources to not mutate the state directly but to create a new array with the resource object added to the end

 	const newResources = this.state.resources.concat({ 
 		
 		 id: new Date().getTime(),
 		 name,
 		 specifics,
 		 pairs
 	});

 this.updateResources(newResources); //calling updateResources method being called  handleCreateResource
 }

 handleSelectResource(resource) {
 	this.setState({
 		selectedResource: resource,
 		showCreate: false
 	});
 }

 //Adding function to delete the resource and pass it in as the onDelete callback. 
 //Not mutating the component state by using the filter method
 //Though there are a few ways to remove items from the array without changing the original array.
 //The filter method will run afunction against every item in the array which returns either true or false
 //and returns a new array with the items that the function returned as false filtered out.
 //In the method we are comparing each resource in the array against the resource we want to delete
 //using the !== operator to see if two objects are the same and returning true if they arent the same and false if its the one we want to delete.
 //This gives a new array with the resource in question filtered out.
 handleDeleteResource(resourceToDelete) {
 	const newResources = this.state.resources.filter(resource => resource !== resourceToDelete);
 	 this.updateResources(newResources); //calling updateResources method in handleDeleteResource 
 	//setting selected resource to null here to prevent deleted resources to continue to show.
 	 this.setState({
 	 	selectedResource: null
 	 });
 }

//The handleSearchChange method
handleSearchChange(search) {
	this.setState({
		search
	});
}

updateResources(newResources) {
	this.setState({
		resources: newResources
	});

	window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newResources));
}	
	



	render() {
		const { resources, selectedResource, showCreate, search } = this.state;
//The filter function here is checking to see if the search string occcurs anywhere in the resource name using the indexOf() method.
//The sort() method is used comaparing two items to display the list of resources alphabetically.
		const filteredResources = resources
		.filter(resource => resource.name.toLowerCase().indexOf(search.toLowerCase()) > -1).sort((a, b) => a.name > b.name);
		
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
			{/* Passing the handleSearchChange function to searchBox component to be called whenever the search changes */}
			   <SearchBox onChange={this.handleSearchChange.bind(this)} />
			   {/* Passing in the resources array specified as a required PropType in ResourceList.js. resources is set to filteredResources in a const  */}
			   <ResourceList resources={filteredResources} 
							 onSelectResource={this.handleSelectResource.bind(this)}			   														
			   /> 
			   </div>
			   <div className='col-xs-8'>
			  { showCreate 
			  	? <CreateForm onSubmit={this.handleCreateResource.bind(this)}/> 
			  	: <ResourceDetail resource={selectedResource} //Passing the selected resource into the ResourceDetail component.
			  	                  onDelete={this.handleDeleteResource.bind(this)} 
			  	                  /> } 
			   </div>
			
             </div>
		</div>
			
			);
	}
}
export default Adminv2ContainerComponent;