"use strict";

// arrays for storing data pulled
let localFB = [];
let localAPI = [];

// stores the firebase data locally
function setLocalFB(objARR) {
	if (Object.keys(objARR).length === 0) {
		return;
	} else {
		localFB = Object.values(objARR);
	}
}

// stores the api search data locally
function setLocalAPI(objARR) {
	localAPI = objARR.results;
}

// adds the movie to the local storage only if
// there isn't a duplicate (when you want to add to fb as well)
function addLocalFB(movieObj) {
	let duplicate = false;
	for (var n = 0; n < localFB.length; n++) {
		if (movieObj.id === localFB[n].id) {
			duplicate = true;
		}
	}
	if (duplicate === true) {
		console.log("its already in the local storage");
		return true;
	} else {
		localFB.push(movieObj);
	}
}

// combines both local storages into one to print to dom in sorted order
function concatFBAPI() {
	console.log("Sort localFB and localAPI here");

	// start with API call array of results
	var comboArray = localAPI.concat(localFB);

	// sort by title name
	comboArray.sort(function(a, b) {
  var nameA = a.title.toUpperCase();
  var nameB = b.title.toUpperCase();
	  if (nameA < nameB) {
	    return -1;
	  }
	  if (nameA > nameB) {
	    return 1;
	  }
		return 0;
	});

	// if we find a duplicate and the duplicate has a uid do nothing
	// if we find a duplicate without a uid, remove it
	for (var n = 0; n < comboArray.length; n++) {

		if (n !== (comboArray.length - 1) && comboArray[n].id === comboArray[n + 1].id && comboArray[n + 1].uid) {
		  console.log("forward check has uid");
		} else if (n !== (comboArray.length - 1) && comboArray[n].id === comboArray[n + 1].id && comboArray[n + 1].uid === undefined) {
			comboArray.splice(n + 1, 1);
		}
		if (n !== 0 && comboArray[n].id === comboArray[n - 1].id && comboArray[n - 1].uid) {
			console.log("backward check has uid");
		} else if (n !== 0 && comboArray[n].id === comboArray[n - 1].id && comboArray[n - 1].uid === undefined) {
			comboArray.splice(n - 1, 1);
		}
	}
	return comboArray;
}

module.exports = {setLocalAPI, setLocalFB, addLocalFB, concatFBAPI};