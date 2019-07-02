var dataModule=(function () {
	//shuffle function
	var shuffleFunction=function (testWordsArray) {
		/*var shuffledArray=[];
		var randIndex;
		while(testWordsArray.length > 0){
			var i=Math.floor(Math.random()*3);
			//shuffledArray.splice(shuffledArray.length,1,testWordsArray[i])
			shuffledArray.push(testWordsArray[i]);
			testWordsArray.splice(i,1);
		}*/
		//correct one
		var shuffledArray=[];
		var randIndex;
		while(testWordsArray.length > 0){
			randomIndex=Math.floor(Math.random()*testWordsArray.length);
			shuffledArray.push(testWordsArray[randomIndex]);
			testWordsArray.splice(randomIndex,1); 
		}
		return shuffledArray;
	};
	//capitalize rand
	var randomCapitalization = function (testWordsArray) {
		var randomlyCapitalizedArray=[];
		//use values not the array object
		for (var i = 0; i <testWordsArray.length; i++) {
			randomlyCapitalizedArray[i] = testWordsArray[i];
		}
		var randomIndex;
		while(testWordsArray.length > 0){
			randomIndex=Math.floor(Math.random()*testWordsArray.length);
			var str=testWordsArray[randomIndex];
			randomlyCapitalizedArray[randomIndex]=str.charAt(0).toUpperCase()+str.slice(1);
			testWordsArray.splice(randomIndex,1);
		}
		return randomlyCapitalizedArray;
	}
	
	//panctuate rand

	var appData={
		indicators:{
			testStarted:false,
			testEnded:false,
			totalTestTime:0,
			timeLeft:0
		},
		results:{
			wpm:0,
			wpmChange:0,
			cpm:0,
			cpmChange:0,
			accuracy:0,
			accuracyChange:0,
			numOfCorrectWords:0,
			numOfCorrectCharacters:0,
			numOfTestCharacters:0
		},
		words:{
			currentWordIndex:0,
			testWords:[],
			currentWord:{}
		}
	};
	// word constructor
	var word = function(index) {

	}
	//update method
	word.prototype.update=function (value) {
		
	}

	return {
		// indicators - test control
		setTestTime: function (x) {
			
		},
		initializeTimeLeft: function () {
			
		},
		startTest: function () {
			
		},
		endTest: function () {
			
		},
		getTimeLeft: function () {
			
		},
		reduceTime: function () {
			
		},
		timeLeft: function () {
			
		},
		testEnded: function () {
			
		},
		testStarted: function () {
			
		},

		//results
		calculateWpm: function () {
			
		},
		calculateAccuracy: function () {
			
		},
		calculateCpm: function () {
			
		},

		//test words
		fillListOfTestWords: function (textNumber,words) {
			var result = words.split(" ");
			if(textNUmber==0){
				//shuffle the words

				//capitalize random strings

				//add random panctuation
			}
			appData.words.testWords=result;
		},
		getListOfTestWords: function () {
			
		},
		moveToNextWord: function () {
			
		},
		updateCurrentWord: function (value) {
			
		}

	}
})();

