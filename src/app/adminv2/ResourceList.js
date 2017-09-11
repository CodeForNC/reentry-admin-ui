import * as React from 'react';
//stateless receiveing its props as the first argument of the component itself
// props argument is destructured here to write resouces.map rather than props.resources.map
//Making the resource details appear when the name is clicked. 
//Making the list into a list of links which call a callback prop when clicked with the appropriate resource object passed as a parameter
//Below well add the prop as required prop in the proptypes then destructure it from the props passed in to the component and then add the link with an onClick.
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