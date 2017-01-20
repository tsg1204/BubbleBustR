// Include React
var React = require("react");
var SaveItem = require('./NewsItems/SaveItem');
// Helper Function
var helpers = require('../../utils/helpers');


// Creating the Login component
var NewsResult = React.createClass({	

    getInitialState: function(){
        return {
            results: [],
            modalIsOpen: false,
            type: "",
            message: ""
        }
    },

    // This function will respond to the user click
    handleClick: function(event){

            helpers.getSaved()
                .then(function(data){
                    if (data === false) {
                        // Show message if no results found
                        this.message('Error','No results found. Please refine inputs.');
                    } else {
                        // Save data to state
                        this.setState({
                            results: data
                        });
                    }
                }.bind(this))  

    },

	render: function() {
	    return (

                <div className="panel-body">
                    <ul className="list-group">

                        <SaveItem />

                    </ul>
                </div>
	    )
	}
});

// Export the component back for use in other files
module.exports = NewsResult;
