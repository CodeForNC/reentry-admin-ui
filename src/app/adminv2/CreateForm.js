import * as React from 'react';


class CreateForm extends React.Component {
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
		this.props.onSubmit(name, specifics, pairs);
		//calling the resetForm method here in the handleSubmit method
		this.resetForm();
		//this setState here is for showing the user a message after the form has been submitted
		this.setState({ created: true});
		//the ref and focus method is for refocising the curor to the name field after the form has submitted
		this.refs.name.focus();
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
		 value={specifics} //value prop with appropriate propert of the state
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
		 value={pairs} //value prop with appropriate propert of the state
		 onChange={this.handleChangePairs.bind(this)}
		 />
		 </div>

		 <input className='btn btn-default' type='submit' value='Create' />
		</form>

	);
}

}

//We need a a proptype called onSubmit here and its required

CreateForm.propTypes = {
	onSubmit: React.PropTypes.func.isRequired
};

export default CreateForm;