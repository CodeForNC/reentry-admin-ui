import * as React from 'react';
//stateless receiveing its props as the first argument of the component itself
const ResourceList = ({ resources, onSelectResource }) => (
		<ul className='list-unstyled'>
		{ resources.map(resource => <li key={resource.id}>
			<a href='#' onClick={(onSelectResource.bind(null, resource))}>{resource.name}</a>
			</li>) }
		</ul>

	);


//This makes the resouces array property from the app state a required proptype
ResourceList.prototypes = {
	resources: React.PropTypes.array.isRequired,
	// for selection of created resources
	onSelectResource: React.PropTypes.func.isRequired
};

export default ResourceList;