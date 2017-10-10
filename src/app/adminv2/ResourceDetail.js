import * as React from 'react';
// defing the delete resource function inside the components main function that does the rendering
	//Putting the function inside the scope of the other function to get access to the props weve just destructured

//The onDelete and onEdit props in the buttons that are passed in to call their callback funtions are destructured and added here to the components props
	const ResourceDetail = ({ resource, onDelete, onEdit }) => { //destructured the resource object here.
		const confirmDelete = () => {
			if (confirm('Are you sure you want to delete this resource?')) {
				onDelete(resource);
		}
	};
	return (
		<div>
			{ resource ? // The ternary operator us used here render a resource if one is passed in otherwise a message will be rendered.
				<div>
				<h2>{ resource.name }</h2>
				
				<h3>Specifics:</h3>
				<p style={{ whiteSpace: 'pre-wrap'}}>{ resource.specifics }</p>

				<h3>Pairs:</h3>
				<p style={{ whiteSpace: 'pre-wrap'}}>{ resource.pairs }</p>
			<div className='btn-toolbar'>

			    <button 
				type='button'
				className='btn btn-default'
				onClick={onEdit}
				>Edit Resource</button>
				
				<button 
				type='button' 
				className='btn btn-danger'
				onClick={confirmDelete}
				>Delete Resource</button>

			</div>
		</div>
		:
		<div> Choose a resource on the left or create a new one</div>
			}
	   </div>

		);
	};

ResourceDetail.propTypes = {
//resource object is not required here because when the user first logs in there will be no resources
	resource: React.PropTypes.object, 
	onDelete: React.PropTypes.func.isRequired,
	onEdit: React.PropTypes.func.isRequired
};

export default ResourceDetail;