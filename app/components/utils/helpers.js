/*Include the Axios library for HTTP requests*/
var axios = require('axios');
// Current base URL
var baseURL = window.location.origin;

// Helper Functions 
var helpers = {

	saveArticle: function(article){

		var queryURL = baseURL + '/api/saved';

		return axios.post(queryURL, {
			'title': article.title,
	    	'pubDate': article.pubDate,
	    	'link': article.link
			})
			.then(function(res){
				return res.data;
			})
			.catch(function(err) {
				return false;
			})
	},

	getSaved: function(){

		var queryURL = baseURL + '/api/saved';

		return axios.get(queryURL)
			.then(function(res){
				if (res.status === 'error') return false;
				return res.data;
			})
			.catch(function(err) {
				return false;
			})
	},

	deleteSaved: function(id){

		var queryURL = baseURL + '/api/saved/' + id;

		return axios.delete(queryURL)
			.then(function(res){
				if (res.status === 'error') return false;
				return res.data;
			})
			.catch(function(err) {
				return false;
			})
	},

	getScrapeArticlesList: function(id){
		var queryURL = '/' + id;
	  	console.log(queryURL);

	  	return axios.get(queryURL)
	  	.then(function(response){
	  		console.log(response.data)
	  		return response.data
	  	})
	},

	getAPIArticlesList: function(id){
		var queryURL;

		switch(id) {
		    case "runGuardian":
					queryURL = 	'https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=latest&apiKey=27b0fae587184d978804a9fe7727d8b4';
		        break;
		    case "runBBC":
					queryURL = 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=27b0fae587184d978804a9fe7727d8b4';
		        break;
		    case "runCNN":
					queryURL = 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=27b0fae587184d978804a9fe7727d8b4';
		        break;
		    case "runEconomist":
					queryURL = 'https://newsapi.org/v1/articles?source=the-economist&sortBy=latest&apiKey=27b0fae587184d978804a9fe7727d8b4';
		        break;		        		        

		}

	  	console.log(queryURL);

	  	return axios.get(queryURL)
	  	.then(function(response){
	  		console.log(response.data)
	  		return response.data
	  	})
	}


}

module.exports = helpers;
