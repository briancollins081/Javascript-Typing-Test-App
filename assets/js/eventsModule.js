var eventsModule = (function(dModule,uModule, cModule, wModule){
	var addEventListeners = function () {
		//key event listener for Enter key, Manually coded
		uModule.getDOMElements().textInput.addEventListener('keydown',function (event) {
			/*do nothing if test ended*/
			if(dModule.testEnded()){
				return;
			}
			//check if user pressed enter
			var key=event.keyCode;
			if(key==13){
				uModule.getDOMElements().textInput.value+=dModule.getLineReturn()+' ';
				//create new input event
				var inputEvent = new Event('input');
				//dispatch event
				uModule.getDOMElements().textInput.dispatchEvent(inputEvent);
			}
		});
		
		//character typing event listener
		uModule.getDOMElements().textInput.addEventListener('input',function (event) {			
			
			if(dModule.testEnded()){ /*do nothing if test ended*/
				return;
			}


			/*test not started yet, start it and count down*/
			if(!dModule.testStarted()){
				//start the test:data module
				dModule.startTest();
				//start a counter
				var b = setInterval(function () {
					//calculate the results data module
					var results = {};
						//update wpm & wpmChange
						[results.wpm, results.wpmChange] = dModule.calculateWpm();
						//update cpm & cpmChange
						[results.cpm, results.cpmChange] = dModule.calculateCpm();
						//update accu & accuChange
						[results.accuracy, results.accuracyChange] = dModule.calculateAccuracy();
						// dModule.returnData();
					//update UI Module
					uModule.updateResults(results);

					if(dModule.timeLeft()){
						//reduce time by 1
						var timeLeft=dModule.reduceTime();
						//update time remaining in UI Module
						uModule.updateTimeLeft(timeLeft);
					}else{
					//no time left: end the test data module & clear interval 
					clearInterval(b);
					dModule.endTest();
					// dModule.returnData();
					//fill the modal
					uModule.fillModal(results.wpm);
					//show the modal
					uModule.showModal();
					}
				},1000);

			}

			/*get typed word: UI Module*/
			var typedWord=uModule.getTypedWord();			
			dModule.updateCurrentWord(typedWord);

			/*format the active word */
			var currentWord=dModule.getCurrentWord();
			uModule.formatWord(currentWord);

			/*space or enter pressed*/
			
			if(uModule.spacePressed(event)||
				uModule.enterPressed(dModule.getLineReturn())){
				/*empty text input*/
				uModule.emptyInput();
				/*deactivate current word*/
				uModule.deactivateCurrentWord();
				/*move to a new word: dataModule*/
				dModule.moveToNextWord();
				/*set active word: UI Module*/
				var cIndex=dModule.getCurrentWordIndex();
				uModule.setActiveWord(cIndex);
				/*format the active word UI Module*/
				var currentWord=dModule.getCurrentWord();
				uModule.formatWord(currentWord);

				/*scroll new word in to middle view*/
				uModule.scroll();
			}	 

		});
		//click on download button event listener

	};

	//scroll active line into middle view on window resize
	window.addEventListener('resize',uModule.scroll);

	return{
		//initialize the test before start
		init: function (duration, textNumber) {
			//fill the list of test words dataModule
			var lineReturn=dModule.getLineReturn();
			var words=wModule.getWords(textNumber);
			dModule.fillListOfTestWords(textNumber,words);
			
			//fill the list of test words UIModule
			var testWords=dModule.getListOfTestWords();
			uModule.fillContent(testWords,lineReturn);
			
			//set total test time:data Module
			dModule.setTestTime(duration);
			
			//update time left dataModule
			dModule.initializeTimeLeft();
			
			//update time left UIModule
			var timeLeft=dModule.getTimeLeft();
			uModule.updateTimeLeft(timeLeft);
			
			//move to a new word: dataModule
			dModule.moveToNextWord();

			//set active word: UI Module
			var cIndex=dModule.getCurrentWordIndex();
			uModule.setActiveWord(cIndex);

			//format the active word UI Module
			var currentWord=dModule.getCurrentWord();
			uModule.formatWord(currentWord);
			
			//focus on text input UI Module
			uModule.inputFocus();
			//set all event listeners
			addEventListeners();
		}
	};
})(dataModule,UIModule,certificateModule,wordsModule);