import * as React from 'react';
// defing the delete resource function inside the components main function that does the rendering
	//Putting the function inside the scope of the other function to get access to the props weve just destructured

	const ResourceDetail = ({ resource, onDelete }) => {
		const confirmDelete = () => {
			if (confirm('Are you sure you want to delete this resource?')) {
				onDelete(resource);
		}
	};
	return (
		<div>
			{ resource ? 
				<div>
				<h2>{ resource.name }</h2>
				
				<h3>Specifics:</h3>
				<p style={{ whiteSpace: 'pre-wrap'}}>{ resource.specifics }</p>

				<h3>Pairs:</h3>
				<p style={{ whiteSpace: 'pre-wrap'}}>{ resource.pairs }</p>

				<button 
				type='button' 
				className='btn btn-danger'
				onClick={confirmDelete}
				>Delete Resource</button>
		</div>
		:
		<div> Choose a resource on the left or create a new on</div>
			}
	   </div>

		);
	};

ResourceDetail.propTypes = {
	resource: React.PropTypes.object,
	onDelete: React.PropTypes.func.isRequired
};

export default ResourceDetail;