// Include React 
var React = require('react');

// Include React Components
var DeleteItem = require('./NewsItems/DeleteItem');


// Helper Function
var helpers = require('../../utils/helpers');

var SavedArticles = React.createClass({

	getInitialState: function(){
		return {
			results: [],
			modalIsOpen: false,
			type: "",
			message: ""
		}
	},

	componentWillMount: function() {
		// Get saved articles
		helpers.getSaved()
			.then(function(data){
				// console.log(data)
				if (data === false) {
					// Show message if unable to delete
					this.message('Error','Unable to find articles. Please try again.');
				} else {
					// Save data to state
					this.setState({
						results: data
					});
				}
			}.bind(this))	
	},

	// Here we render the function
	render: function(){

		var deleted = this.deleted;

		return(
			<div>

                <div className="panel-body">
                    <ul className="list-group">
				  		{this.state.results.map(function(result) {
					  		return (
					  			<DeleteItem 
					  				key={result._id}
					  				id={result._id}
					  				title={result.title}
					  				link={result.link}
					  				pubDate={result.pubDate}
					  				deleted={deleted}
					  			/>
					  		)
					  	})}
                    </ul>
                </div>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = SavedArticles;