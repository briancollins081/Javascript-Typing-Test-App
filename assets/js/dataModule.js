var dataModule=(function () {
	//line return
	var lineReturn='|';
	//shuffle function
	var shuffleWords=function (testWordsArray) {
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
	var addRandomCapitalization = function (testWordsArray) {
		var randomlyCapitalizedArray=[];
		//use values not the array object
		for (var i = 0; i <testWordsArray.length; i++) {
			randomlyCapitalizedArray[i] = testWordsArray[i];
		};
		var randomIndex;
		while(testWordsArray.length > 0){
			randomIndex=Math.floor(Math.random()*testWordsArray.length);
			var str=testWordsArray[randomIndex];
			randomlyCapitalizedArray[randomIndex]=str.charAt(0).toUpperCase()+str.slice(1);
			testWordsArray.splice(randomIndex,1);
		};
		return randomlyCapitalizedArray;
	};
	/*var f= ['lorem','ipsum','dolor','sit','amet','consectetur',
	'adipisicing','elit.','Cum','labore','quod','id','minus','quas','minima','unde','ut','incidunt','nemo','porro.','Culpa','quam','asperiores','consequatur','quo','quia','accusantium','ducimus','distinctio','similique.'];
	console.log(randomCapitalization(f));*/

	//panctuate rand
	var addRandomPunctuation=function (testWordsArray) {
		return testWordsArray.map(function(currentWord) {
			var items=[lineReturn,lineReturn,
			'?','?',
			',',',', ',', ',', ',', ',', 
			'.','.','.',,'.',
			'!','!',
			'','','','','','','','','',''];
			var randomIndex=Math.floor(Math.random()*items.length);
			var randomPunctuation=items[randomIndex];
			
			return currentWord+randomPunctuation;
		});
	};
	/*var f= ['lorem','ipsum','dolor','sit','amet','incidunt','nemo','lorem','ipsum','dolor','sit','amet','incidunt','nemo','lorem','ipsum','dolor','sit','amet','incidunt','nemo','lorem','ipsum','dolor','sit','amet','incidunt','nemo'];
	console.log(addRandomPunctuation(f));
	*/

	/*calculate correct chars in user typed word*/
	var noCorrectChars; //correct chars
	var characterCallback=function (currentElement, index) {
		noCorrectChars += (currentElement==this.characters.user[index]) ? 1:0;
	};

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
			currentWordIndex:-1,
			testWords:[],
			currentWord:{}
		}
	};
	// word constructor
	var word = function(index) {
		// word values correct and users
		this.value={
			correct:appData.words.testWords[index] + ' ',
			user:'',
			isCorrect: false
		};
		// chars correct and users
		this.characters={
			correct: this.value.correct.split(''),
			user:[],
			totalCorrect: 0,
			totalTestChars:this.value.correct.length
		};
	};
	//update method: updates the word object using the user typed values
	word.prototype.update=function (value) {
		//update the user input
		this.value.user=value;
		//update the words status(correct or incorrect)
		this.value.isCorrect = (this.value.correct == this.value.user);
		//update user characters
		this.characters.user = this.value.user.split('');

		//calc number of correct characters		
		noCorrectChars=0;

		var characterCallback2=characterCallback.bind(this);
		
		this.characters.correct.forEach(characterCallback2);
		this.characters.totalCorrect=noCorrectChars;
	};

	return {
		// indicators - test control
		setTestTime: function (x) {
			appData.indicators.totalTestTime=x;
		},
		initializeTimeLeft: function () {
			appData.indicators.timeLeft=appData.indicators.totalTestTime;
		},
		startTest: function () {
			appData.indicators.testStarted=true;
		},
		endTest: function () {
			
		},
		getTimeLeft: function () {
			return appData.indicators.timeLeft;
		},
		reduceTime: function () {
			appData.indicators.timeLeft --;
			return appData.indicators.timeLeft;
		},
		timeLeft: function () { 
			return appData.indicators.timeLeft != 0;
		},
		testEnded: function () {
			return appData.indicators.testEnded;
		},
		testStarted: function () {
			return appData.indicators.testStarted;
		},

		//results
		/*wpm & wpmChange*/
		calculateWpm: function () {
			var wpmOld = appData.results.wpm;
			var numOfCorrectWords=appData.results.numOfCorrectWords;
			if(appData.indicators.timeLeft!=appData.indicators.totalTestTime){
				appData.results.wpm = Math.round(60 * numOfCorrectWords / (appData.indicators.totalTestTime - appData.indicators.timeLeft));

			}else{
				appData.results.wpm=0;
			}
			appData.results.wpmChange=appData.results.wpm - wpmOld;

			return [appData.results.wpm, appData.results.wpmChange];
		},
		calculateAccuracy: function () {
			
		},
		calculateCpm: function () {
			
		},

		//test words
		fillListOfTestWords: function (textNumber,words) {
			var result = words.split(" ");
			if(textNumber==0){
				//shuffle the words
				result=shuffleWords(result);
				//capitalize random strings
				result=addRandomCapitalization(result);
				//add random panctuation
				result=addRandomPunctuation(result);
			}
			appData.words.testWords=result;
		},
		getListOfTestWords: function () {
			return appData.words.testWords;
		},
		getCurrentWordIndex: function () {
			return appData.words.currentWordIndex;
		},
		moveToNextWord: function () {
			if(appData.words.currentWordIndex > -1){
				//update correct words number
				if(appData.words.currentWord.value.isCorrect==true){
					appData.results.numOfCorrectWords++;
				}
				//update no correct characters
				appData.results.numOfCorrectCharacters += 
				appData.words.currentWord.characters.totalCorrect;
				//update no of test characters
				appData.results.numOfTestCharacters += appData.words.currentWord.characters.totalTestChars;
			}
			appData.words.currentWordIndex ++;
			var currentIndex=appData.words.currentWordIndex;
			var newWord = new word(currentIndex);
			appData.words.currentWord=newWord;


		},
		//updates the current word using the user input
		updateCurrentWord: function (value) {
			appData.words.currentWord.update(value);
		},
		getLineReturn: function() {
			return lineReturn;
		},
		getCurrentWord: function () {
			var currentWord=appData.words.currentWord;
			return {
				value:{
					correct:currentWord.value.correct,
					user:currentWord.value.user
				}
			}
		},

		returnData(){
			console.log(appData);
		}

	}
})();

