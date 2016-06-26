var friendsData = require('../data/friends.js');


module.exports = function(app){


app.get('/api/friends', function(req, res){
		res.json(friendsData);
});


app.post('/api/friends', function(req, res){
	
	//if no one in database return this	
	if(friendsData.length < 1){
		var noData = {
			name:"insufficient data for comparison",
			picture: "http://placehold.it/350x150"
		}
		res.json(noData);
		friendsData.push(req.body);
	}
	//otherwise
	else{
	//sum of user answer array
	var inputVal = sumArray(req.body.vals);
	//sum of first person in database answer array
	var firstFriend = sumArray(friendsData[0].vals);
	//initial value to compare others to
	var val = Math.abs(inputVal - firstFriend);
	//initial index
	var index = 0;
	//loop through database answers arrays after index 0 and if find a sum 
	//less than val replace val with sum and index with i
	for(var i=1 ; i < friendsData.length ; i++){
		var currentVal = Math.abs(inputVal - sumArray(friendsData[i].vals));
		if(currentVal < val){
			val = currentVal;
			index = i;
		}
	}
	//final answer to be pushed
	var answer = {
		name: friendsData[index].name,
		picture: friendsData[index].picture
	}

	friendsData.push(req.body);
	res.json(answer);
	}
	

	});



//takes in an array of numbers as strings and outputs sum as int
function sumArray(array){

	return array.reduce(function(a,b){return parseInt(a) + parseInt(b);});
}

	
};