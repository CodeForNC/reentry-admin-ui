import * as React from 'react';


class CreateEditForm extends React.Component {
	//Storing the initial state with a constructor
	
	constructor() {
		super()

		this.state = {
			
			name: '',
			specifics: '',
			pairs: '',
			created: false //this boolean exists for showing the user a message after the form is submitted
		};
	}

//...lifecycle method stuff here for the edit
componentDidMount() {
	this.setStateFromResource(this.props.resource);
}
//... some more lifecycle method stuff for the edit here
// here we can compare the props in this.props with the newer props in nextProps and then take a particular action
//... depending on how the props have changed. Here were just calling setStateFromResource
componentWillReceiveProps(nextProps) {
	this.setStateFromResource(nextProps.resource);
}
//...lifecycle stuff here for the edit too also
// we add the resource prop to the createEditForm's propTypes
// we set the forms state to contain the values from a resource prop if it is passed in or default to an empty string if not
setStateFromResource(resource) {
	this.setState({
		name: resource ? resource.name : '',
		specifics: resource ? resource.specifics : '',
		pairs: resource ? resource.pairs : ''
	});
}	

	//Below are event handlers to handle the change in state when text is enetred into the forms

	handleChangeName(event) {
		this.setState({ name: event.target.value });
	}

	handleChangeSpecifics(event) {
		this.setState({ specifics: event.target.value });
	}

	handleChangePairs(event) {
		this.setState({ pairs: event.target.value });
	}
//Handling the submit event with the handleSubmit method and callback props with the name, specifics and pairs that the user has entered into the form
	handleSubmit(event) {
		event.preventDefault(); // calling prevent default to prevent the form's default submit action which would cause the page to reload
//Again avoiding using this.state for every value input with es6 desructured const
		const { name, specifics, pairs } = this.state;
//This "if else" is here in the handleSubmit method to call onEdit if a resource is passed in as a prop for editing else create if we are not.
//... there will be no success message like when resource is created just a return to the newly edited resource.
		if (this.props.resource) {
			this.props.onEdit(name, specifics, pairs);
		} else {
			this.props.onCreate(name, specifics, pairs);
			//calling the resetForm method here in the handleSubmit method
			this.resetForm();
			//this setState here is for showing the user a message after the form has been submitted
			this.setState({ created: true});
			//the ref and focus method is for refocising the curor to the name field after the form has submitted
			this.refs.name.focus();
		}

	}

//This method will reset the strings when this method is called from the handle submit method
resetForm() {
	this.setState({
		name: '',
		specifics: '',
		pairs: ''
	});
}
	render () {
		//Avoiding using some more of this.state with an es6 desructuring const
		const { name, specifics, pairs, created} = this.state;
//these props are added here for the ternary operator in the create/edit button to determine whether to show the create button text or edit button text based on whether there are props.
		const { resource } = this.props;
		return (
//onSubmit handler method added to the form componant for well you know.
		<form onSubmit={this.handleSubmit.bind(this)}> 
		{ created && <div className='alert alert-success'>Your resource was created</div> }
		 <div>
		 <label htmlFor='name'>Resource name:</label>
		 <input
		 type='text'
		 className='form-control'
		 id='name'
		 placeholder='Enter resource name'
		 value={name} //value prop with appropriate propert of the state
		 onChange={this.handleChangeName.bind(this)}
		 ref='name' //this ref is here to make the cursor refocus on the name input field after the form has been submitted

		 />
		 </div>

		 <div className='form-group'>
		  <label htmlFor='specifics'>Specifics:</label>
		 <textarea
		 type='text'
		 className='form-control'
		 id='specifics'
		 rows='5'
		 placeholder='Enter resource specifics'
		 value={specifics} //value prop with appropriate propert of the state.
		 onChange={this.handleChangeSpecifics.bind(this)}

		 />
		 </div>

		  <div className='form-group'>
		  <label htmlFor='pairs'>Pairs:</label>
		 <textarea
		 type='text'
		 className='form-control'
		 rows='10'
		 id='pairs'
		 placeholder='Enter resource pairs'
		 value={pairs} //value prop with appropriate property of the state
		 onChange={this.handleChangePairs.bind(this)}
		 />
		 </div>

		 <input className='btn btn-default' 
		 type='submit' 
		 value={this.props.resource ? 'Edit' : 'Create'} />
		</form>

	);
}

}

//We need a a proptype called onCreate and onEdit here and its required
CreateEditForm.propTypes = {
	onCreate: React.PropTypes.func.isRequired,
	onEdit: React.PropTypes.func.isRequired,
	resource: React.PropTypes.object
};

export default CreateEditForm;